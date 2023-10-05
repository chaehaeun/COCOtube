import styles from './ChannelHeader.module.scss'

interface ChannelHeaderProps {
  url: string
  isLoading: boolean
}

const ChannelHeader = ({ url, isLoading }: ChannelHeaderProps) => {
  return (
    <div>
      <h3 className="sr-only_Title">채널 헤더</h3>
      <div className={styles.headerImgWrap}>
        {isLoading ? null : <img src={url} alt="" />}
      </div>
    </div>
  )
}

export default ChannelHeader
