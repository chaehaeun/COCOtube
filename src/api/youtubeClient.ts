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

    return {
      video: res.data.items.map((item: YoutubeVideo) =>
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

  channelImageURL = async (id: string) => {
    const res = await this.httpClient.get('/channels', {
      params: {
        part: 'snippet',
        id: id,
      },
    })

    return res.data.items[0].snippet.thumbnails.default.url
  }

  relatedVideos = async (id: string) => {
    const res = await this.httpClient.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        relatedToVideoId: id,
      },
    })

    return res.data.items.map((item: YoutubeVideo) => this.mapToVideoItem(item))
  }
}

const youtubeClient = new YoutubeClient()

export default youtubeClient
