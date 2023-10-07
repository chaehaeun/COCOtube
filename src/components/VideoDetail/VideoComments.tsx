import styles from './VideoComments.module.scss'

const VideoComments = () => {
  return (
    <li className={styles.commentsWrap}>
      <div className={styles.thumbsnail}>
        <img src="" alt="" />
      </div>
      <div className={styles.commentContainer}>
        <div>
          <span className={styles.name}>아이디</span>
          <span className={styles.date}>1일 전</span>
        </div>
        <pre className={styles.comment}>
          보안관도 트롤인데 우원박도 너무 복잡하게 만듬
          ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        </pre>
        <span className={styles.like}>
          <span /> 150
        </span>
      </div>
    </li>
  )
}

export default VideoComments
