import { Link } from 'react-router-dom'
import styles from './VideoCard.module.scss'

// 얘가 쓰이는 곳
// 홈, 플레이리스트, 검색결과, 비디오 상세페이지

const VideoCard = () => {
  return (
    <li className={styles.videoCard}>
      <Link to="/">
        <div className={styles.thumbnail}></div>
      </Link>
      <div className={styles.videoDescription}>
        <div className={styles.channel}>
          <Link to="/" aria-label="'채널이름'으로 바로가기" />
        </div>
        <div className={styles.textDescription}>
          <p className={styles.title}>
            <Link to="/" aria-label="비디오 제목">
              [Playlist] 오롯이 혼자인 방 안에서, 그리고 재즈 | Work & Study
              Jazz | Relaxing Background Music
            </Link>
          </p>
          <span className={styles.channelName}>
            <Link to="/" aria-label="채널이름으로 바로가기">
              WRG 우리가 듣고 싶어서 연주한 playlist
            </Link>
          </span>
          <div className={styles.extra}>
            <span>조회수 3.5만회</span>
            <span>8일 전</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default VideoCard
