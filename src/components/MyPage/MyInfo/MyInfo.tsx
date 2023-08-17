import { ChannelBtn } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
// import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks'
import ClipLoader from 'react-spinners/ClipLoader'

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
}

const MyInfo = ({
  type,
  userData,
  onClick,
  handleEditMode,
  isEdit,
}: MyInfoInfoProps) => {
  const {
    isLoading: editLoading,
    startLoading: startEditLoading,
    stopLoading: stopEditLoading,
  } = useLoading()

  const renderThumbnail = () => {
    if (!userData?.photoURL) {
      return <div className={styles.thumbSkeleton} />
    }

    return (
      <img
        src={userData.photoURL}
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

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">
        {type === 'channel' ? '채널 정보' : '사용자 정보'}
      </h3>
      <div className={styles.info}>
        <div className={styles.thumb}>{renderThumbnail()}</div>
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
        </div>
      </div>
    </section>
  )
}

export default MyInfo
