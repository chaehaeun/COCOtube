import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'

interface ChannelProps {
  type: 'myPage' | 'channel'
}

const Channel = ({ type }: ChannelProps) => {
  return (
    <div className={styles.channelWrap}>
      <ChannelHeader type={type} />
      <ChannelInfo type={type} />
      <ChannelNav type={type} />
    </div>
  )
}

export default Channel
