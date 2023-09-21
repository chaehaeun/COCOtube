import { YoutubeVideoType } from '@/types'
import styles from './Video.module.scss'
import VideoDetailChannel from './VideoDetailChannel'

interface VideoProps {
  video: YoutubeVideoType
}

const Video = ({ video }: VideoProps) => {
  const { title, id, channelId, channelTitle } = video

  return (
    <div className={styles.video}>
      <iframe
        title={title}
        id="player"
        src={`https://www.youtube.com/embed/${id}`}
      />
      <h3>{title}</h3>
      <VideoDetailChannel channelId={channelId} channelTitle={channelTitle} />
    </div>
  )
}

export default Video
