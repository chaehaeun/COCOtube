import { useQuery } from '@tanstack/react-query'
import styles from './VideoDetailChannel.module.scss'
import { youtubeClient } from '@/api'
import { formatSubscriberCount } from '@/util'

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
    <div>
      <div className={styles.thumbnail}>
        <img src={imgURL} alt={`${channelTitle} 썸네일`} />
      </div>
      <p>{channelTitle}</p>
      <p>{formatSubscriberCount(+subscriberCount)}</p>
    </div>
  )
}

export default VideoDetailChannel
