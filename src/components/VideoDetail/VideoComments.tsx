import styles from './VideoComments.module.scss'

const VideoComments = () => {
  return (
    <li className={styles.commentsWrap}>
      <div className={styles.thumbsnail}>
        <img src="" alt="" />
      </div>
      <div>
        <div>
          <span>아이디</span>
          <span>날짜</span>
        </div>
        <p>
          냠 당할때마다 절규가 진짜 깨물리는 사람같아서 개웃김 ㅋㅋㅋㅋㅋㅋㅋㅋ
        </p>
        <span>
          <span></span> 150
        </span>
      </div>
    </li>
  )
}

export default VideoComments
