import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'
import { Outlet } from 'react-router-dom'

interface ChannelProps {
  type: 'myPage' | 'channel'
}

const Channel = ({ type }: ChannelProps) => {
  return (
    <div className={styles.channelWrap}>
      <ChannelHeader type={type} />
      <ChannelInfo type={type} />
      <ChannelNav type={type} />
      <div className={styles.outletWrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default Channel
