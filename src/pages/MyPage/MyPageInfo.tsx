import { fetchSubscriptionList, fetchVideoList } from '@/api'
import { useAuth } from '@/hooks'
import { userDataAtom, userLoadingAtom, userUidAtom } from '@/store'
import { formatDateFromTimestamp } from '@/util'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import styles from './MyPageInfo.module.scss'

const MyPageInfo = () => {
  const { user } = useAuth()
  const [userDataState] = useRecoilState(userDataAtom)
  const [userLoadingState] = useRecoilState(userLoadingAtom)
  const [userUid] = useRecoilState(userUidAtom)

  const { data: subscriptions } = useQuery(
    ['subscriptions', userUid],
    () => fetchSubscriptionList(userUid),
    { enabled: false },
  )
  const { data: videoList } = useQuery(
    ['videoList', userUid],
    () => fetchVideoList(userUid),
    { enabled: !!userUid },
  )

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
            <p>{videoList?.length || 0}개</p>
          </li>
          <li>
            <span>구독 채널 개수</span>
            <p>{subscriptions?.length || 0}개</p>
          </li>
        </ul>
        <div>
          <span>통계</span>
          <ul>
            <li>
              가입일{' '}
              <span>
                {user?.metadata.creationTime &&
                  formatDateFromTimestamp(user.metadata.creationTime)}
              </span>
            </li>
            <li>
              마지막 로그인{' '}
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
