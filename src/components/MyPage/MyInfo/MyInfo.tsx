import { ChannelBtn } from '@/components'
import styles from './MyInfo.module.scss'
import { Link } from 'react-router-dom'
import { GrNext } from 'react-icons/gr'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface MyInfoInfoProps {
  type: 'myPage' | 'channel'
  userData?: {
    displayName: string | null | undefined
    email: string | null | undefined
    photoURL: string | null | undefined
    introduce: string | null | undefined
  }
}

const MyInfo = ({ type, userData }: MyInfoInfoProps) => {
  console.log(userData)

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">
        {type === 'channel' ? '채널 정보' : '사용자 정보'}
      </h3>
      <div className={styles.info}>
        <div className={styles.thumb}>
          {userData?.photoURL ? (
            <img
              src={userData.photoURL}
              alt={`${userData.displayName} 프로필 사진`}
            />
          ) : (
            <Skeleton circle={true} height={100} width={100} />
          )}
        </div>
        <div className={styles.textInfo}>
          <p className={styles.name}>{userData?.displayName}</p>
          <div className={styles.subInfo}>
            <span>{userData?.email}</span>
            <span>구독자 8.4천명</span>
            <span>동영상 45개</span>
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
          <ChannelBtn mode="subscribe" onClick={() => {}}>
            구독
          </ChannelBtn>
        </div>
      </div>
    </section>
  )
}

export default MyInfo
