import {
  fetchSubscriptionList,
  fetchVideoList,
  updateLikedVideos,
  updateSubscriptions,
  youtubeClient,
} from '@/api'
import { userUidAtom } from '@/store'
import { Subscription, YoutubeVideoType } from '@/types'
import { formatSubscriberCount } from '@/util'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { VideoDetailButton } from '..'
import styles from './VideoDetailChannel.module.scss'
import { STALE_TIME } from '@/constants'

interface VideoDetailChannelProps {
  channelId: string
  channelTitle: string
  video: YoutubeVideoType
}

const VideoDetailChannel = ({
  channelId,
  channelTitle,
  video,
}: VideoDetailChannelProps) => {
  const queryClient = useQueryClient()
  const channelName =
    channelTitle.length > 20 ? `${channelTitle.slice(0, 20)}...` : channelTitle
  const { data: channelData, isLoading: channelImgLoading } = useQuery(
    ['channel', channelId],
    () => youtubeClient.channelData(channelId),
    { staleTime: STALE_TIME },
  )
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [userUid] = useRecoilState(userUidAtom)
  const { data: videoList } = useQuery(
    ['videoList', userUid],
    () => fetchVideoList(userUid),
    { enabled: !!userUid },
  )
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

  useEffect(() => {
    if (!userUid || !videoList) return
    const videoExists = videoList.some(
      (v: YoutubeVideoType) => v.id === video.id,
    )

    if (videoExists) {
      setIsLiked(true)
    }
  }, [videoList, video.id])

  const imgURL = channelData?.snippet.thumbnails.default.url
  const subscriberCount = channelData?.statistics.subscriberCount

  const subscriptionHandler = async () => {
    await updateSubscriptions(userUid, channelId, channelTitle, imgURL)
    setIsSubscribed(prev => !prev)
    queryClient.invalidateQueries(['subscriptions', userUid])
    refetchSubscriptions()
  }

  const likeHandler = async () => {
    await updateLikedVideos(userUid, video)
    setIsLiked(prev => !prev)
  }

  const channelState = {
    channelId,
    channelTitle,
  }

  return (
    <div className={styles.channelCont}>
      <div className={styles.channelInfo}>
        <Link
          to={`/channel/${channelId}`}
          state={channelState}
          className={styles.thumbnail}
        >
          {channelImgLoading ? null : (
            <img src={imgURL} alt={`${channelTitle} 썸네일`} />
          )}
        </Link>
        <div>
          <p className={styles.title}>{channelName}</p>
          <p className={styles.subscriber}>
            구독자 {formatSubscriberCount(+subscriberCount)}
          </p>
        </div>
        {userUid && (
          <VideoDetailButton
            mode="subscribe"
            isActive={isSubscribed}
            onClick={subscriptionHandler}
          >
            {isSubscribed ? '구독중' : '구독'}
          </VideoDetailButton>
        )}
      </div>
      {userUid && (
        <VideoDetailButton mode="like" isActive={isLiked} onClick={likeHandler}>
          {isLiked ? '좋아요 취소' : '좋아요'}
        </VideoDetailButton>
      )}
    </div>
  )
}

export default VideoDetailChannel
