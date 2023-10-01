import { updateSubscriptions, youtubeClient } from '@/api'
import { userUidAtom } from '@/store'
import { formatSubscriberCount } from '@/util'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { VideoDetailButton } from '..'
import styles from './VideoDetailChannel.module.scss'

interface VideoDetailChannelProps {
  channelId: string
  channelTitle: string
}

const VideoDetailChannel = ({
  channelId,
  channelTitle,
}: VideoDetailChannelProps) => {
  const { data: channelData } = useQuery(
    ['channel', channelId],
    () => youtubeClient.channelData(channelId),
    { staleTime: 1000 * 60 * 10 },
  )
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [userUid] = useRecoilState(userUidAtom)

  const imgURL = channelData?.snippet.thumbnails.default.url
  const subscriberCount = channelData?.statistics.subscriberCount

  const subscriptionHandler = async () => {
    await updateSubscriptions(userUid, channelTitle, channelId, imgURL)
    setIsSubscribed(prev => !prev)
  }

  return (
    <div className={styles.channelCont}>
      <div className={styles.channelInfo}>
        <Link to={'/'} className={styles.thumbnail}>
          <img src={imgURL} alt={`${channelTitle} 썸네일`} />
        </Link>
        <div>
          <p className={styles.title}>{channelTitle}</p>
          <p className={styles.subscriber}>
            구독자 {formatSubscriberCount(+subscriberCount)}
          </p>
        </div>
        <VideoDetailButton
          mode="subscribe"
          isActive={isSubscribed}
          onClick={subscriptionHandler}
        >
          {isSubscribed ? '구독중' : '구독'}
        </VideoDetailButton>
      </div>
      <VideoDetailButton
        mode="like"
        isActive={isLiked}
        onClick={() => {
          setIsLiked(prev => !prev)
        }}
      >
        {isLiked ? '좋아요 취소' : '좋아요'}
      </VideoDetailButton>
    </div>
  )
}

export default VideoDetailChannel
