import { ChannelBtn, Modal } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLoading, useModal } from '@/hooks'
import ClipLoader from 'react-spinners/ClipLoader'
import { ChangeEvent, useEffect, useState } from 'react'

interface MyInfoInfoProps {
  userData?: {
    displayName: string | null | undefined
    email: string | null | undefined
    photoURL: string | null | undefined
    introduce: string | null | undefined
  }
  onClick: () => Promise<void>
  handleEditMode: () => void
  isEdit: boolean
  onDataChange: (data: Record<string, string>) => void
}

const MyInfo = ({
  userData,
  onClick,
  handleEditMode,
  isEdit,
  onDataChange,
}: MyInfoInfoProps) => {
  const {
    isLoading: editLoading,
    startLoading: startEditLoading,
    stopLoading: stopEditLoading,
  } = useLoading()
  const [initialData, setInitialData] = useState(userData)
  const [displayName, setDisplayName] = useState(userData?.displayName || '')
  const [introduce, setIntroduce] = useState(userData?.introduce || '')
  const [imageUrl, setImageUrl] = useState(userData?.photoURL || '')
  const { showModal, content, openModal, closeModal } = useModal()

  useEffect(() => {
    setInitialData(userData)
    setDisplayName(userData?.displayName || '')
    setIntroduce(userData?.introduce || '')
  }, [userData?.photoURL, userData?.displayName, userData?.introduce])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFile = e.target.files?.[0]
    if (selectedImageFile) {
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
        setImageUrl(dataUrl)
        onDataChange({ photoURL: dataUrl })
      }
      reader.readAsDataURL(selectedImageFile)
    }
  }

  const renderThumbnail = () => {
    if (!userData?.photoURL) {
      return <div className={styles.thumbSkeleton} />
    }

    return (
      <img
        src={isEdit ? imageUrl : userData.photoURL}
        alt={`${userData.displayName} 프로필 사진`}
        loading="lazy"
      />
    )
  }

  const renderIntroContent = () => {
    if (userData?.introduce === undefined) {
      return <span className={styles.introSkeleton} />
    }

    return userData.introduce !== '' ? (
      <span>{userData.introduce}</span>
    ) : (
      <span>자기 소개가 없습니다.</span>
    )
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
    onDataChange({ displayName: e.target.value })
  }

  const handleIntroChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduce(e.target.value)
    if (e.target.value.trim().length === 0) {
      onDataChange({ introduce: '' })

      return
    }
    onDataChange({ introduce: e.target.value })
  }

  const handleUpdate = async () => {
    if (displayName.trim() === '' || displayName.trim().length < 2) {
      openModal('닉네임은 최소 2자 이상이어야 합니다.')

      return
    }

    try {
      startEditLoading()
      await onClick()
    } finally {
      stopEditLoading()
    }
  }

  const handleCancel = () => {
    handleEditMode()
    onDataChange({
      displayName: '',
      introduce: '',
    })
    setImageUrl(initialData?.photoURL || '')
    setDisplayName(initialData?.displayName || '')
    setIntroduce(initialData?.introduce || '')
  }

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">회원 정보</h3>
      <div className={styles.info}>
        <div className={styles.thumb}>
          {isEdit ? (
            <label aria-label="썸네일 이미지 선택">
              <div className={styles.edit}>
                <span>이미지 변경하기</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />

              {imageUrl && <img src={imageUrl} alt="배너 이미지 미리보기" />}
            </label>
          ) : (
            renderThumbnail()
          )}
        </div>
        <div className={styles.textInfo}>
          {isEdit ? (
            <label aria-label="닉네임 변경 인풋" className={styles.editInput}>
              <input
                type="text"
                value={displayName}
                onChange={handleNameChange}
              />
            </label>
          ) : (
            <p className={styles.name}>
              {userData?.displayName || (
                <span className={styles.displayNameSkeleton} />
              )}
            </p>
          )}

          <div className={styles.subInfo}>
            <span>
              {userData?.email || <span className={styles.emailSkeleton} />}
            </span>
          </div>
          {isEdit ? (
            <label aria-label="자기소개 변경 인풋" className={styles.editInput}>
              <input
                type="text"
                value={introduce}
                onChange={handleIntroChange}
              />
            </label>
          ) : (
            <p className={styles.intro}>
              <Link to="/mypage">
                {renderIntroContent()}
                <span className={styles.next} />
              </Link>
            </p>
          )}
        </div>
        <div className={styles.btnCont}>
          <ChannelBtn
            mode="subscribe"
            onClick={isEdit ? handleUpdate : handleEditMode}
          >
            {editLoading && <ClipLoader color="#000" loading size={10} />}
            {isEdit ? '수정하기' : '정보 수정'}
          </ChannelBtn>
          {isEdit && (
            <ChannelBtn mode="subscribe" onClick={handleCancel}>
              취소
            </ChannelBtn>
          )}
        </div>
      </div>

      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </section>
  )
}

export default MyInfo
