import { TEXT_MAX_LENGTH } from '@/constants'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchVideoCard.module.scss'
import { formatAgo, formatEntity } from '@/util'
import { YoutubeVideoType } from '@/types'

interface SearchVideoCardProps {
  video: YoutubeVideoType
}

const SearchVideoCard = ({ video }: SearchVideoCardProps) => {
  const textRef = useRef<HTMLParagraphElement>(null)

  const { publishedAt, thumbnails, title, channelTitle, description, id } =
    video

  useEffect(() => {
    const textElement = textRef.current

    if (!textElement || textElement?.textContent === null) return
    else if (textElement.textContent.length > TEXT_MAX_LENGTH) {
      textElement.textContent = `${textElement.textContent.slice(
        0,
        TEXT_MAX_LENGTH - 3,
      )}...`
    }
  }, [])

  return (
    <li className={styles.videoCard}>
      <Link className={styles.thumbnail} state={video} to={`/video/${id}`}>
        <div>
          <img src={thumbnails.medium.url} alt={`${title} 썸네일`} />
        </div>
      </Link>
      <div className={styles.description}>
        <Link state={video} to={`/video/${id}`} className={styles.videoInfo}>
          <p className={styles.title}>{formatEntity(title)}</p>
        </Link>

        <Link className={styles.channel} to="/">
          <span className={styles.channelTitle}>
            {formatEntity(channelTitle)}
          </span>
          <span>{formatAgo(publishedAt)}</span>
        </Link>

        <Link state={video} to={`/video/${id}`}>
          <p className={styles.text} ref={textRef}>
            {formatEntity(description)}
          </p>
        </Link>
      </div>
    </li>
  )
}

export default SearchVideoCard
