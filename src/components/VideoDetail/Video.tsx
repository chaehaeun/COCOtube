import { YoutubeVideoType } from '@/types'
import { useState } from 'react'
import styles from './Video.module.scss'
import VideoDetailChannel from './VideoDetailChannel'

interface VideoProps {
  video: YoutubeVideoType
}

const Video = ({ video }: VideoProps) => {
  const [isSummary, setIsSummary] = useState<boolean>(true)
  const { title, id, channelId, channelTitle, description } = video
  const summaryBtnText = isSummary ? '더보기' : '간략히'

  const videoDescription = isSummary
    ? `${description.slice(0, 100)} ...`
    : description

  return (
    <div className={styles.video}>
      <iframe
        title={title}
        id="player"
        src={`https://www.youtube.com/embed/${id}`}
      />
      <h3>{title}</h3>
      <VideoDetailChannel
        video={video}
        channelId={channelId}
        channelTitle={channelTitle}
      />
      <div className={styles.description}>
        <pre>{videoDescription}</pre>
        <button type="button" onClick={() => setIsSummary(prev => !prev)}>
          {summaryBtnText}
        </button>
      </div>
    </div>
  )
}

export default Video
