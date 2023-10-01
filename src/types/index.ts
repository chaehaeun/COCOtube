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
