import { useLocation } from 'react-router-dom'
import styles from './ChannelVideos.module.scss'
import { useInfiniteScroll } from '@/hooks'
import { youtubeClient } from '@/api'
import { YoutubeVideoType } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { ClipLoader } from 'react-spinners'
import { VideoCard } from '@/components'

const ChannelVideos = () => {
  const { pathname } = useLocation()
  const channelId = pathname.split('/')[2]

  const {
    ref,
    isLoading,
    data: videoData,
    error,
  } = useInfiniteScroll(
    ['channelVideo', channelId, 'date'],
    ({ pageParam = undefined }) =>
      youtubeClient.listChannelVideos(channelId, pageParam, 'date'),
  )

  const videos: YoutubeVideoType[] =
    videoData?.pages.flatMap(page => page.video) || []

  return (
    <>
      <div>
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
      </div>
      {error && <p>데이터를 불러오는데 실패했습니다.</p>}
    </>
  )
}

export default ChannelVideos
