import { VideoList } from '@/components'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <h2 className={styles.title}>Home</h2>
      <VideoList />
    </>
  )
}

export default Home
