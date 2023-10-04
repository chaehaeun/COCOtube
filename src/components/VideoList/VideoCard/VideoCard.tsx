import { Link } from 'react-router-dom'
import styles from './VideoCard.module.scss'
import { YoutubeVideoType } from '@/types'
import { formatAgo, formatEntity } from '@/util'

interface VideoCardProps {
  video: YoutubeVideoType
}

const VideoCard = ({ video }: VideoCardProps) => {
  const { publishedAt, thumbnails, title, channelTitle, id, channelId } = video

  const channelState = {
    channelId,
    channelTitle,
  }

  return (
    <li className={styles.videoCard}>
      <Link state={video} to={`/video/${id}`}>
        <div className={styles.thumbnail}>
          <img src={thumbnails.medium.url} alt={`${title} 썸네일`} />
        </div>
      </Link>
      <div className={styles.videoDescription}>
        <div className={styles.textDescription}>
          <p className={styles.title}>
            <Link state={video} to={`/video/${id}`} aria-label="비디오 제목">
              {formatEntity(title)}
            </Link>
          </p>
          <span className={styles.channelName}>
            <Link
              to={`/channel/${channelId}`}
              aria-label="채널이름으로 바로가기"
              state={channelState}
            >
              {formatEntity(channelTitle)}
            </Link>
          </span>
          <div className={styles.extra}>
            <span>{formatAgo(publishedAt)}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default VideoCard
