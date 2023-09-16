import { PER_PAGE } from '@/constants'
import { YoutubeVideo } from '@/types'
import axios from 'axios'

class YoutubeClient {
  httpClient
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    })
  }

  searchByKeyword = async (keyword: string | undefined, pageToken?: string) => {
    const params = {
      part: 'snippet',
      maxResults: PER_PAGE,
      type: 'video',
      q: keyword,
      pageToken,
    }

    const res = await this.httpClient.get('/search', { params })

    return {
      video: res.data.items.map((item: YoutubeVideo) => ({
        publishTime: item.snippet.publishTime,
        thumbnails: item.snippet.thumbnails,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        id: item.id.videoId,
      })),
      nextPageToken: res.data.nextPageToken,
    }
  }

  mostPopular = async () => {
    const res = await this.httpClient.get('/videos', {
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
      },
    })

    return res.data.items
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

    return res.data.items.map((item: YoutubeVideo) => ({
      ...item,
      id: item.id.videoId,
    }))
  }
}

const youtubeClient = new YoutubeClient()

export default youtubeClient
