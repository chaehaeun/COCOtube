import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'
import { Outlet, useLocation } from 'react-router-dom'
import { youtubeClient } from '@/api'
import { useQuery } from '@tanstack/react-query'

const Channel = () => {
  const { state: channelData } = useLocation()
  const channelId = channelData?.channelId

  const { data: channelDetailData, isLoading } = useQuery(
    ['channel', channelId],
    () => youtubeClient.channelData(channelId),
    { staleTime: 1000 * 60 * 10 },
  )

  const channelInfoData = {
    thumbnail: channelDetailData?.snippet.thumbnails.medium.url,
    customUrl: channelDetailData?.snippet.customUrl,
    description: channelDetailData?.snippet.description,
    subscriberCount: channelDetailData?.statistics.subscriberCount,
    videoCount: channelDetailData?.statistics.videoCount,
  }

  const bannerImgURL =
    channelDetailData?.brandingSettings.image.bannerExternalUrl

  return (
    <div className={styles.channelWrap}>
      <ChannelHeader isLoading={isLoading} url={bannerImgURL} />
      <ChannelInfo
        isLoading={isLoading}
        channelData={channelData}
        channelInfoData={channelInfoData}
      />
      <ChannelNav channelId={channelId} type="channel" />
      <div className={styles.outletWrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default Channel
