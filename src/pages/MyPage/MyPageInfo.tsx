import { useAuth } from '@/hooks'
import styles from './MyPageInfo.module.scss'
import { userDataAtom, userLoadingAtom } from '@/store'
import { useRecoilState } from 'recoil'
import { formatDateFromTimestamp } from '@/util'

const MyPageInfo = () => {
  const { user } = useAuth()
  const [userDataState] = useRecoilState(userDataAtom)
  const [userLoadingState] = useRecoilState(userLoadingAtom)

  const renderIntroContent = () => {
    if (userLoadingState) {
      return <span className={styles.introSkeleton} />
    }

    return userDataState.introduce !== '' ? (
      <p>{userDataState.introduce}</p>
    ) : (
      <p>자기 소개가 없습니다.</p>
    )
  }

  return (
    <>
      <h3 className="sr-only_Title">회원 상세 정보</h3>
      <div className={styles.wrap}>
        <ul>
          <li>
            <span>자기 소개 말</span>
            {renderIntroContent()}
          </li>
          <li>
            <span>좋아요 영상 개수</span>
            <p>10개</p>
          </li>
          <li>
            <span>구독 채널 개수</span>
            <p>10개</p>
          </li>
          <li>
            <span>작성한 댓글 수</span>
            <p>10개</p>
          </li>
        </ul>
        <div>
          <span>통계</span>
          <ul>
            <li>
              가입일
              <span>
                {user?.metadata.creationTime &&
                  formatDateFromTimestamp(user.metadata.creationTime)}
              </span>
            </li>
            <li>
              마지막 로그인
              <span>
                {user?.metadata.lastSignInTime &&
                  formatDateFromTimestamp(user.metadata.lastSignInTime)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyPageInfo
