import { useLocation } from 'react-router-dom'

const VideoDetail = () => {
  const { state: video } = useLocation()

  console.log(video)

  return <div></div>
}

export default VideoDetail
