import { ChannelBtn } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as GrNext } from '@/assets/icons/GrNext.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react'
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
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isLoading, startLoading, stopLoading } = useLoading()

  useEffect(() => {
    if (userData?.photoURL) {
      const img = new Image()
      img.onload = () => {
        setImageLoaded(true)
      }
      img.src = userData.photoURL
    }
  }, [userData?.photoURL])

  const renderThumbnail = () => {
    if (!userData?.photoURL) {
      return <Skeleton circle={true} height={100} width={100} />
    }

    if (imageLoaded) {
      return (
        <img
          src={userData.photoURL}
          alt={`${userData.displayName} 프로필 사진`}
          loading="lazy"
        />
      )
    }

    return <Skeleton circle={true} height={100} width={100} />
  }

  const handleUpdate = async () => {
    try {
      startLoading()
      await onClick()
    } finally {
      stopLoading()
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
          <p className={styles.name}>{userData?.displayName}</p>
          <div className={styles.subInfo}>
            <span>{userData?.email}</span>
          </div>
          <p className={styles.intro}>
            <Link to="/mypage">
              <span>
                {userData?.introduce
                  ? userData?.introduce
                  : '소개말이 없습니다.'}
              </span>
              <GrNext />
            </Link>
          </p>
        </div>
        <div className={styles.btnCont}>
          {isEdit ? (
            <ChannelBtn mode="subscribe" onClick={handleUpdate}>
              {isLoading && <ClipLoader color="#000" loading size={10} />}
              수정하기
            </ChannelBtn>
          ) : (
            <ChannelBtn mode="subscribe" onClick={handleEditMode}>
              정보 수정
            </ChannelBtn>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyInfo
