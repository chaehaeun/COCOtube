interface Thumbnail {
  url: string
  width: number
  height: number
}

interface YoutubeVideoSnippet {
  channelId: string
  channelTitle: string
  description: string
  liveBroadcastContent: string
  publishTime: string
  publishedAt: string
  thumbnails: {
    default: Thumbnail
    high: Thumbnail
    medium: Thumbnail
  }
  title: string
}

export interface YoutubeVideo {
  etag: string
  id: {
    kind: string
    videoId: string
  }
  kind: string
  snippet: YoutubeVideoSnippet
}

export interface YoutubeVideoType {
  channelId: string
  publishedAt: string
  thumbnails: {
    default: Thumbnail
    high: Thumbnail
    medium: Thumbnail
  }
  title: string
  channelTitle: string
  description: string
  id: string
}

export interface CommentsType {
  authorDisplayName: string
  authorProfileImageUrl: string
  textDisplay: string
  likeCount: number
  publishedAt: string
}
