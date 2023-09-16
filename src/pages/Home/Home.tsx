import styles from './Home.module.scss'
import { youtubeClient } from '@/api'
import { VideoCard } from '@/components'
import { useInfiniteScroll } from '@/hooks'
import { YoutubeVideoType } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { ClipLoader } from 'react-spinners'

const Home = () => {
  const {
    ref,
    isLoading,
    data: videoData,
    error,
  } = useInfiniteScroll(['popular', 'home'], ({ pageParam = undefined }) =>
    youtubeClient.mostPopular(pageParam),
  )

  const videos: YoutubeVideoType[] =
    videoData?.pages.flatMap(page => page.video) || []

  return (
    <>
      <h2 className="sr-only_Title">Home</h2>
      {!isLoading && videos.length > 0 && (
        <>
          <ul className="videoList">
            {videos.map((video: YoutubeVideoType) => (
              <VideoCard key={uuidv4()} video={video} />
            ))}
          </ul>
          <div ref={ref} className={styles.spinner}>
            <ClipLoader />
          </div>
        </>
      )}

      {isLoading && (
        <div className={styles.spinner}>
          <ClipLoader />
        </div>
      )}

      {error && <p>데이터를 불러오는데 실패했습니다.</p>}
    </>
  )
}

export default Home
