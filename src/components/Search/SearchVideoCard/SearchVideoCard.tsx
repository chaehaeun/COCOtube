import { TEXT_MAX_LENGTH } from '@/constants'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchVideoCard.module.scss'

const SearchVideoCard = () => {
  const textRef = useRef<HTMLParagraphElement>(null)

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
      <Link className={styles.thumbnail} to="/">
        <div>
          <img src="" alt="썸네일" />
        </div>
      </Link>
      <div className={styles.description}>
        <Link to="/" className={styles.videoInfo}>
          <p className={styles.title}>[스우파] 메가 크루 미션 대중 평가</p>
          <div>
            <span>조회수 122만회</span>
            <span>15시간 전</span>
          </div>
        </Link>

        <Link className={styles.channel} to="/">
          <div className={styles.channelThumb}></div>
          <span className={styles.channelTitle}>The Choom(더 춤)</span>
        </Link>

        <Link to="/">
          <p className={styles.text} ref={textRef}>
            지금 바로! 가장 인상적인 초대형 퍼포먼스를 보여준 크루에게
            투표해주세요🔥지금 바로! 가장 인상적인 초대형 퍼포먼스를 보여준
            크루에게 투표해주세요🔥지금 바로! 가장 인상적인 초대형 퍼포먼스를
            보여준 크루에게 투표해주세요🔥지금 바로! 가장 인상적인 초대형
            퍼포먼스를 보여준 크루에게 투표해주세요🔥
          </p>
        </Link>
      </div>
    </li>
  )
}

export default SearchVideoCard
