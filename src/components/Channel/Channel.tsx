import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'
import { Outlet, useLocation } from 'react-router-dom'

const Channel = () => {
  const { state: channelData } = useLocation()

  const { channelTitle, channelId } = channelData

  return (
    <div className={styles.channelWrap}>
      <ChannelHeader />
      <ChannelInfo />
      <ChannelNav type="channel" />
      <div className={styles.outletWrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default Channel
