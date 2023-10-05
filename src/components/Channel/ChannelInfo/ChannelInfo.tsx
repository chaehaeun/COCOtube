import { ChannelBtn } from '@/components'
import styles from './ChannelInfo.module.scss'
import { Link } from 'react-router-dom'
import { formatSubscriberCount } from '@/util'

interface ChannelInfoProps {
  channelData: {
    channelTitle: string
    channelId: string
  }
  channelInfoData: {
    thumbnail: string
    customUrl: string
    description: string
    subscriberCount: string
    videoCount: string
  }
  isLoading: boolean
}

const ChannelInfo = ({
  channelData,
  channelInfoData,
  isLoading,
}: ChannelInfoProps) => {
  const { channelTitle, channelId } = channelData
  const { thumbnail, customUrl, description, subscriberCount, videoCount } =
    channelInfoData

  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">채널 정보</h3>
      <div className={styles.info}>
        <div className={styles.thumb}>
          {isLoading ? null : (
            <img src={thumbnail} alt={`${channelTitle} 썸네일`} />
          )}
        </div>
        <div className={styles.textInfo}>
          <p className={styles.name}>{channelTitle}</p>
          <div className={styles.subInfo}>
            <span>{customUrl}</span>
            <span>구독자 {formatSubscriberCount(+subscriberCount)}명</span>
            <span>동영상 {formatSubscriberCount(+videoCount)}개</span>
          </div>
          <p className={styles.intro}>
            <Link to={`/channel/${channelId}/info`}>
              <span>{description}</span>
              <span className={styles.next} />
            </Link>
          </p>
        </div>
        <div className={styles.btnCont}>
          <ChannelBtn mode="subscribe" onClick={() => {}}>
            구독
          </ChannelBtn>
        </div>
      </div>
    </section>
  )
}

export default ChannelInfo
