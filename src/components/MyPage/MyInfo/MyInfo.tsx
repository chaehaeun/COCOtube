import { ChannelBtn, Modal } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAuth, useLoading, useModal } from '@/hooks'
import ClipLoader from 'react-spinners/ClipLoader'
import { ChangeEvent, useEffect, useState } from 'react'
import { deleteUser } from 'firebase/auth'
import { userDataAtom, userUidAtom } from '@/store'
import { useRecoilState } from 'recoil'
import {
  updateIntroduce,
  updateProfileImage,
  updateDisplayName,
  updateBannerImage,
} from '@/api'

interface MyInfoInfoProps {
  handleEditMode: () => void
  isEdit: boolean
  bannerURL: string
}

const MyInfo = ({ handleEditMode, isEdit, bannerURL }: MyInfoInfoProps) => {
  const {
    isLoading: editLoading,
    startLoading: startEditLoading,
    stopLoading: stopEditLoading,
  } = useLoading()
  const { user } = useAuth()
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom)
  const [userUid] = useRecoilState(userUidAtom)
  const [initialData, setInitialData] = useState(userDataState)
  const [displayName, setDisplayName] = useState(
    userDataState?.displayName || '',
  )
  const [introduce, setIntroduce] = useState(userDataState?.introduce || '')
  const [imageUrl, setImageUrl] = useState(userDataState?.photoURL || '')
  const { showModal, content, openModal, closeModal } = useModal()

  useEffect(() => {
    setInitialData(userDataState)
    setDisplayName(userDataState?.displayName || '')
    setIntroduce(userDataState?.introduce || '')
    setImageUrl(userDataState?.photoURL || '')
  }, [
    userDataState?.photoURL,
    userDataState?.displayName,
    userDataState?.introduce,
    userDataState?.photoURL,
  ])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFile = e.target.files?.[0]
    if (selectedImageFile) {
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
        setImageUrl(dataUrl)
      }
      reader.readAsDataURL(selectedImageFile)
    }
  }

  const renderThumbnail = () => {
    if (!userDataState?.photoURL) {
      return <div className={styles.thumbSkeleton} />
    }

    return (
      <img
        src={isEdit ? imageUrl : userDataState.photoURL}
        alt={`${userDataState.displayName} 프로필 사진`}
        loading="lazy"
      />
    )
  }

  const renderIntroContent = () => {
    if (userDataState?.introduce === undefined) {
      return <span className={styles.introSkeleton} />
    }

    return userDataState.introduce !== '' ? (
      <span>{userDataState.introduce}</span>
    ) : (
      <span>자기 소개가 없습니다.</span>
    )
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
  }

  const handleIntroChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduce(e.target.value)
  }

  const handleUpdate = async () => {
    if (displayName.trim() === '' || displayName.trim().length < 2) {
      openModal('닉네임은 최소 2자 이상이어야 합니다.')

      return
    }

    startEditLoading()
    try {
      if (user) {
        await updateIntroduce(introduce, userUid)
        await updateDisplayName(displayName, userUid, user)

        if (imageUrl !== initialData?.photoURL) {
          await updateProfileImage(imageUrl, userUid, user)
        }
        if (bannerURL.includes('data:')) {
          await updateBannerImage(bannerURL, userUid)
        }

        if (bannerURL) {
          setUserDataState(prev => ({
            ...prev,
            bannerImg: bannerURL,
            introduce,
            displayName,
            photoURL: imageUrl,
          }))
        } else {
          setUserDataState(prev => ({
            ...prev,
            introduce,
            displayName,
            photoURL: imageUrl,
          }))
        }
      }
    } catch {
      openModal('회원 정보 수정에 실패했습니다.')
    } finally {
      stopEditLoading()
      handleEditMode()
    }
  }

  const handleCancel = () => {
    handleEditMode()
    setImageUrl(initialData?.photoURL || '')
    setDisplayName(initialData?.displayName || '')
    setIntroduce(initialData?.introduce || '')
  }

  const handleWithdrawal = async () => {
    try {
      if (user) {
        await deleteUser(user)
      }
    } catch {
      openModal('회원 탈퇴에 실패했습니다.')
    }
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
              {userDataState?.displayName || (
                <span className={styles.displayNameSkeleton} />
              )}
            </p>
          )}

          <div className={styles.subInfo}>
            <span>
              {userDataState?.email || (
                <span className={styles.emailSkeleton} />
              )}
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
            mode="default"
            onClick={isEdit ? handleUpdate : handleEditMode}
          >
            {editLoading && <ClipLoader color="#000" loading size={10} />}
            {isEdit ? '수정하기' : '정보 수정'}
          </ChannelBtn>

          <ChannelBtn
            mode="negative"
            onClick={isEdit ? handleCancel : handleWithdrawal}
          >
            {isEdit ? '취소' : '회원탈퇴'}
          </ChannelBtn>
        </div>
      </div>

      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </section>
  )
}

export default MyInfo
