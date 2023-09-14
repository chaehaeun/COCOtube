import axios from 'axios'

class YoutubeClient {
  httpClient
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    })
  }

  searchByKeyword = async (keyword: string) => {
    const res = await this.httpClient.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword,
      },
    })

    return res.data.items.map(item => ({ ...item, id: item.id.videoId }))
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

    return res.data.items.map(item => ({ ...item, id: item.id.videoId }))
  }
}

const youtubeClient = new YoutubeClient()

export default youtubeClient
