import { ChannelHeader, ChannelInfo, ChannelNav } from '@/components'
import styles from './Channel.module.scss'
import { useLocation } from 'react-router-dom'
import { youtubeClient } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ChannelInformation, ChannelVideos } from '@/pages'
import { STALE_TIME } from '@/constants'

const Channel = () => {
  const { state: channelData } = useLocation()
  const [activeMenu, setActiveMenu] = useState<'videos' | 'info'>('videos')
  const channelId = channelData?.channelId

  const { data: channelDetailData, isLoading } = useQuery(
    ['channel', channelId],
    () => youtubeClient.channelData(channelId),
    { staleTime: STALE_TIME },
  )

  const channelInfoData = {
    channelTitle: channelDetailData?.snippet.title,
    channelId: channelDetailData?.id,
    thumbnail: channelDetailData?.snippet.thumbnails.medium.url,
    customUrl: channelDetailData?.snippet.customUrl,
    description: channelDetailData?.snippet.description,
    subscriberCount: channelDetailData?.statistics.subscriberCount,
    videoCount: channelDetailData?.statistics.videoCount,
  }

  const channelInformationPageData = {
    description: channelDetailData?.snippet.description,
    publishedAt: channelDetailData?.snippet.publishedAt,
    viewCount: channelDetailData?.statistics.viewCount,
  }

  const bannerImgURL =
    channelDetailData?.brandingSettings.image.bannerExternalUrl

  return (
    <div className={styles.channelWrap}>
      <ChannelHeader isLoading={isLoading} url={bannerImgURL} />
      <ChannelInfo
        isLoading={isLoading}
        channelInfoData={channelInfoData}
        setActiveMenu={setActiveMenu}
      />
      <ChannelNav
        type="channel"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className={styles.outletWrap}>
        {activeMenu === 'videos' ? (
          <ChannelVideos />
        ) : (
          <ChannelInformation channelInfoData={channelInformationPageData} />
        )}
      </div>
    </div>
  )
}

export default Channel
