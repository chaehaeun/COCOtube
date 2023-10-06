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
  } = useInfiniteScroll(
    ['popular', 'home', undefined],
    ({ pageParam = undefined }) => youtubeClient.mostPopular(pageParam),
  )

  const videos: YoutubeVideoType[] =
    videoData?.pages.flatMap(page => page.video) || []

  const isQuotaExceeded =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error && (error as any).response && (error as any).response.status === 403

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

      {isQuotaExceeded && (
        <p>
          죄송합니다. youtube api 하루 요청 가능 횟수를 초과하였습니다. <br />
          기능이 정상적으로 작동하지 않을 수 있습니다.
          <br />
          불편하시더라도 실제 구동은 데모 영상으로 확인 부탁드립니다.
        </p>
      )}
      {error && !isQuotaExceeded && <p>데이터를 불러오는데 실패했습니다.</p>}
    </>
  )
}

export default Home
