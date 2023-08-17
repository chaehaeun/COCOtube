import styles from './VideoList.module.scss'
import { VideoCard } from '@/components'

const VideoList = () => {
  return (
    <ul className={styles.videoList}>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </ul>
  )
}

export default VideoList
