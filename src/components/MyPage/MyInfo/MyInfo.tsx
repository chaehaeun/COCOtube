import { ChannelBtn } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLoading } from '@/hooks'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState } from 'react'

interface MyInfoInfoProps {
  type: 'myPage' | 'channel'
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
  type,
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

  const [initialData] = useState(userData)
  // const [displayName, setDisplayName] = useState(userData?.displayName || '')
  // const [introduce, setIntroduce] = useState(userData?.introduce || '')
  const [imageUrl, setImageUrl] = useState(userData?.photoURL || '')

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

    if (userData.introduce !== '') {
      return <span>{userData.introduce}</span>
    }

    return <span>자기 소개가 없습니다.</span>
  }

  const handleUpdate = async () => {
    try {
      startEditLoading()
      await onClick()
    } finally {
      stopEditLoading()
    }
  }

  const handleCancel = () => {
    handleEditMode()
    onDataChange({ photoURL: '', displayName: '', introduce: '' })
    setImageUrl(initialData?.photoURL || '')
  }

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">
        {type === 'channel' ? '채널 정보' : '사용자 정보'}
      </h3>
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
          <p className={styles.name}>
            {userData?.displayName || (
              <span className={styles.displayNameSkeleton} />
            )}
          </p>
          <div className={styles.subInfo}>
            <span>
              {userData?.email || <span className={styles.emailSkeleton} />}
            </span>
          </div>
          <p className={styles.intro}>
            <Link to="/mypage">
              {renderIntroContent()}
              <span className={styles.next} />
            </Link>
          </p>
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
    </section>
  )
}

export default MyInfo
