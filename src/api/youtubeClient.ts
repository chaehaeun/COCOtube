import { PER_PAGE } from '@/constants'
import { YoutubeVideo, YoutubeVideoType } from '@/types'
import axios from 'axios'

class YoutubeClient {
  httpClient
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    })
  }

  private mapToVideoItem(item: YoutubeVideo): YoutubeVideoType {
    const videoId = typeof item.id === 'string' ? item.id : item.id.videoId

    return {
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      id: videoId,
    }
  }

  searchByKeyword = async (
    keyword: string | undefined,
    pageToken?: string,
    order:
      | 'date'
      | 'rating'
      | 'relevance'
      | 'title'
      | 'videoCount'
      | 'viewCount' = 'relevance',
  ): Promise<{
    video: YoutubeVideoType
    nextPageToken: boolean
  }> => {
    const params = {
      part: 'snippet',
      maxResults: PER_PAGE,
      type: 'video',
      q: keyword,
      pageToken,
      order,
    }

    const res = await this.httpClient.get('/search', { params })
    const videoIds = res.data.items
      .map((item: YoutubeVideo) => item.id.videoId)
      .join(',')

    const detailsRes = await this.httpClient.get('/videos', {
      params: {
        part: 'snippet',
        id: videoIds,
      },
    })

    return {
      video: detailsRes.data.items.map((item: YoutubeVideo) =>
        this.mapToVideoItem(item),
      ),
      nextPageToken: res.data.nextPageToken,
    }
  }

  mostPopular = async (
    pageToken?: string,
  ): Promise<{
    video: YoutubeVideoType
    nextPageToken: boolean
  }> => {
    const params = {
      part: 'snippet',
      maxResults: PER_PAGE,
      chart: 'mostPopular',
      pageToken,
    }

    const res = await this.httpClient.get('/videos', {
      params,
    })

    return {
      video: res.data.items.map((item: YoutubeVideo) =>
        this.mapToVideoItem(item),
      ),
      nextPageToken: res.data.nextPageToken,
    }
  }

  channelData = async (id: string) => {
    const res = await this.httpClient.get('/channels', {
      params: {
        part: 'snippet,statistics,brandingSettings',
        id: id,
      },
    })

    return res.data.items[0]
  }

  relatedVideos = async (id: string) => {
    const res = await this.httpClient.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        relatedToVideoId: id,
      },
    })

    return res.data.items.map((item: YoutubeVideo) => this.mapToVideoItem(item))
  }

  listChannelVideos = async (
    channelId: string,
    pageToken?: string,
    order:
      | 'date'
      | 'rating'
      | 'relevance'
      | 'title'
      | 'videoCount'
      | 'viewCount' = 'relevance',
  ): Promise<{
    video: YoutubeVideoType
    nextPageToken: boolean
  }> => {
    const params = {
      part: 'snippet',
      maxResults: PER_PAGE,
      channelId,
      pageToken,
      order,
    }

    const res = await this.httpClient.get('/search', { params })

    return {
      video: res.data.items.map((item: YoutubeVideo) =>
        this.mapToVideoItem(item),
      ),
      nextPageToken: res.data.nextPageToken,
    }
  }

  getVideoComments = async (videoId: string) => {
    const params = {
      part: 'snippet',
      maxResults: PER_PAGE,
      videoId,
      // pageToken,
    }

    const res = await this.httpClient.get('/commentThreads', { params })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const comments = res.data.items.map((item: any) => {
      const data = item.snippet.topLevelComment.snippet

      return {
        authorDisplayName: data.authorDisplayName,
        authorProfileImageUrl: data.authorProfileImageUrl,
        textDisplay: data.textDisplay,
        likeCount: data.likeCount,
        publishedAt: data.publishedAt,
      }
    })

    return comments
  }
}

const youtubeClient = new YoutubeClient()

export default youtubeClient
