import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'
import { useLocation } from 'react-router-dom'
import { youtubeClient } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ChannelVideos } from '@/pages'

const Channel = () => {
  const { state: channelData } = useLocation()
  const [activeMenu, setActiveMenu] = useState<'videos' | 'info'>('videos')
  const channelId = channelData?.channelId

  const { data: channelDetailData, isLoading } = useQuery(
    ['channel', channelId],
    () => youtubeClient.channelData(channelId),
    { staleTime: 1000 * 60 * 10 },
  )

  console.log(channelDetailData)

  const channelInfoData = {
    channelTitle: channelDetailData?.snippet.title,
    channelId: channelDetailData?.id,
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
      <ChannelInfo isLoading={isLoading} channelInfoData={channelInfoData} />
      <ChannelNav
        type="channel"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className={styles.outletWrap}>
        {activeMenu === 'videos' ? <ChannelVideos /> : null}
      </div>
    </div>
  )
}

export default Channel
