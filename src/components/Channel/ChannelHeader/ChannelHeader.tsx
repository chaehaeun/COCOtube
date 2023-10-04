import styles from './ChannelHeader.module.scss'

const ChannelHeader = () => {
  return (
    <div>
      <h3 className="sr-only_Title">채널 헤더</h3>
      <div className={styles.headerImgWrap}>
        <img
          src="https://9to5mac.com/wp-content/uploads/sites/6/2021/09/Mac.png?w=1024"
          alt=""
        />
      </div>
    </div>
  )
}

export default ChannelHeader
