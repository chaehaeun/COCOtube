import { VideoCard } from '@/components'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <h2 className={styles.title}>Home</h2>
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
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </ul>
    </>
  )
}

export default Home
