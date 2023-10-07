import { CommentsType } from '@/types'
import styles from './VideoComments.module.scss'
import { formatAgo, formatEntity } from '@/util'

interface VideoCommentsProps {
  comment: CommentsType
}

const VideoComments = ({ comment }: VideoCommentsProps) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
  } = comment

  return (
    <li className={styles.commentsWrap}>
      <div className={styles.thumbsnail}>
        <img src={authorProfileImageUrl} alt={authorDisplayName} />
      </div>
      <div className={styles.commentContainer}>
        <div>
          <span className={styles.name}>{authorDisplayName}</span>
          <span className={styles.date}>{formatAgo(publishedAt)}</span>
        </div>
        <pre className={styles.comment}>{formatEntity(textDisplay)}</pre>
        <span className={styles.like}>
          <span /> {likeCount}
        </span>
      </div>
    </li>
  )
}

export default VideoComments
