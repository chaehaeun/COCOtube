import { CommentsType } from '@/types'
import styles from './VideoComments.module.scss'

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
        <img src={authorProfileImageUrl} alt="" />
      </div>
      <div className={styles.commentContainer}>
        <div>
          <span className={styles.name}>{authorDisplayName}</span>
          <span className={styles.date}>{publishedAt}</span>
        </div>
        <pre className={styles.comment}>{textDisplay}</pre>
        <span className={styles.like}>
          <span /> {likeCount}
        </span>
      </div>
    </li>
  )
}

export default VideoComments
