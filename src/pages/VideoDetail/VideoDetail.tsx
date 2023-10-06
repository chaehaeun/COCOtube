import { SearchVideoCard, Video } from '@/components'
import { useLocation } from 'react-router-dom'
import styles from './VideoDetail.module.scss'
// import { useQuery } from '@tanstack/react-query'
// import { youtubeClient } from '@/api'
// import { STALE_TIME } from '@/constants'

const VideoDetail = () => {
  const { state: video } = useLocation()

  const { title } = video

  // const { data: relatedVideos } = useQuery(['related', '06IJM0r4IQc'], () =>
  //   youtubeClient.relatedVideos('06IJM0r4IQc'),
  // )

  // console.log(id)

  // console.log(relatedVideos)

  return (
    <section className={styles.videoDetail}>
      <h2 className="sr-only_Title">{title} 비디오 상세페이지</h2>

      <Video video={video} />
      {/* <div className={styles.comments}>댓글창</div> */}
      <ul className={styles.relativeVideos}>
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
        <SearchVideoCard video={video} type="relative" />
      </ul>
    </section>
  )
}

export default VideoDetail
