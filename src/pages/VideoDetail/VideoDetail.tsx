import {
  // SearchVideoCard,
  Video,
  VideoComments,
} from '@/components'
import { useLocation } from 'react-router-dom'
import styles from './VideoDetail.module.scss'
import { CommentsType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { youtubeClient } from '@/api'
import { STALE_TIME } from '@/constants'

const VideoDetail = () => {
  const { state: video } = useLocation()
  const { title, id } = video

  // const { data: relatedVideos } = useQuery(['related', '06IJM0r4IQc'], () =>
  //   youtubeClient.relatedVideos('06IJM0r4IQc'),
  // )

  const { data: commentData } = useQuery(
    ['comments', id],
    () => youtubeClient.getVideoComments(id),
    { staleTime: STALE_TIME },
  )

  return (
    <section className={styles.videoDetail}>
      <h2 className="sr-only_Title">{title} 비디오 상세페이지</h2>

      <Video video={video} />
      <ul className={styles.comments}>
        {commentData?.map((comment: CommentsType, idx: number) => (
          <VideoComments key={idx} comment={comment} />
        ))}
      </ul>
      {/* <ul className={styles.relativeVideos}>
        <SearchVideoCard video={video} type="relative" />
      </ul> */}
    </section>
  )
}

export default VideoDetail
