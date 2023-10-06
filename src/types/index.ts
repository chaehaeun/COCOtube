export * from './youtubeResponse'

export type SearchFilter =
  | 'date'
  | 'rating'
  | 'relevance'
  | 'title'
  | 'videoCount'
  | 'viewCount'

export interface Subscription {
  channelId: string
  channelName: string
  thumbnail: string
}

export interface ChannelInfoType {
  channelTitle: string
  channelId: string
  thumbnail: string
  customUrl: string
  description: string
  subscriberCount: string
  videoCount: string
}

export interface channelInformationPageDataType {
  description: string
  publishedAt: string
  viewCount: string
}
