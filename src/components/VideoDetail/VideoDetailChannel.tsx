import { youtubeClient } from '@/api'
import { formatSubscriberCount } from '@/util'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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

  const imgURL = channelData?.snippet.thumbnails.default.url
  const subscriberCount = channelData?.statistics.subscriberCount

  return (
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
    </div>
  )
}

export default VideoDetailChannel
