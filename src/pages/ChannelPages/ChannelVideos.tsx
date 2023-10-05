import { useLocation } from 'react-router-dom'
import styles from './ChannelVideos.module.scss'

const ChannelVideos = () => {
  const { state: channelId } = useLocation()

  return (
    <ul className={styles.videoList}>
      <li>하이용</li>
    </ul>
  )
}

export default ChannelVideos
