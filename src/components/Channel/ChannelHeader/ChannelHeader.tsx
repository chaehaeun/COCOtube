import styles from './ChannelHeader.module.scss'

interface ChannelHeaderProps {
  type: 'channel' | 'myPage'
}

const ChannelHeader = ({ type }: ChannelHeaderProps) => {
  return (
    <div>
      <h3 className="sr-only_Title">{type} 헤더</h3>
      <div className={styles.headerImgWrap}>
        <img
          src="https://yt3.googleusercontent.com/26Kpxnbd1W6qtZ2dfANyMafcZmcIjAS3riOR07F9acBUszAiXZZ9-HkCqIOjNtNrWd-CXyGicw=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt=""
        />
      </div>
    </div>
  )
}

export default ChannelHeader
