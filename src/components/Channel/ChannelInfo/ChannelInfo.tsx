import { ChannelBtn } from '@/components'
import styles from './ChannelInfo.module.scss'
import { formatSubscriberCount } from '@/util'
import { useEffect, useState } from 'react'
import { fetchSubscriptionList, updateSubscriptions } from '@/api'
import { userUidAtom } from '@/store'
import { ChannelInfoType, Subscription } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'

interface ChannelInfoProps {
  channelInfoData: ChannelInfoType
  isLoading: boolean
  setActiveMenu: React.Dispatch<React.SetStateAction<'videos' | 'info'>>
}

const ChannelInfo = ({
  channelInfoData,
  isLoading,
  setActiveMenu,
}: ChannelInfoProps) => {
  const queryClient = useQueryClient()
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [userUid] = useRecoilState(userUidAtom)
  const {
    thumbnail,
    customUrl,
    description,
    subscriberCount,
    videoCount,
    channelTitle,
    channelId,
  } = channelInfoData

  const { data: subscriptions, refetch: refetchSubscriptions } = useQuery(
    ['subscriptions', userUid],
    () => fetchSubscriptionList(userUid),
    { enabled: !!userUid },
  )

  useEffect(() => {
    if (!subscriptions || !userUid) return
    const isChannelSubscribed = subscriptions.some(
      (sub: Subscription) => sub.channelId === channelId,
    )

    setIsSubscribed(isChannelSubscribed)
  }, [subscriptions, userUid, channelId])

  const subscriptionHandler = async () => {
    await updateSubscriptions(userUid, channelId, channelTitle, thumbnail)
    setIsSubscribed(prev => !prev)
    queryClient.invalidateQueries(['subscriptions', userUid])
    refetchSubscriptions()
  }

  const handleActiveMenu = () => {
    setActiveMenu('info')
  }

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">채널 정보</h3>
      <div className={styles.info}>
        <div className={styles.thumb}>
          {isLoading ? null : (
            <img src={thumbnail} alt={`${channelTitle} 썸네일`} />
          )}
        </div>
        <div className={styles.textInfo}>
          <p className={styles.name}>
            {isLoading ? (
              <span className={styles.nameSkeleton} />
            ) : (
              channelTitle
            )}
          </p>
          <div className={styles.subInfo}>
            {isLoading ? (
              <>
                <span className={styles.subInfoSkeleton} />
                <span className={styles.subInfoSkeleton} />
                <span className={styles.subInfoSkeleton} />
              </>
            ) : (
              <>
                <span>{customUrl}</span>
                <span>구독자 {formatSubscriberCount(+subscriberCount)}명</span>
                <span>동영상 {formatSubscriberCount(+videoCount)}개</span>
              </>
            )}
          </div>
          <p className={styles.intro}>
            <button type="button" onClick={handleActiveMenu}>
              {isLoading ? (
                <span className={styles.introSkeleton} />
              ) : (
                <span>{description}</span>
              )}

              <span className={styles.next} />
            </button>
          </p>
        </div>
        {userUid && (
          <div className={styles.btnCont}>
            <ChannelBtn mode="subscribe" onClick={subscriptionHandler}>
              {isSubscribed ? '구독중' : '구독'}
            </ChannelBtn>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChannelInfo
