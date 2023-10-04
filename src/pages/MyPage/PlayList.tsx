// import { FilterBtnList } from '@/components'

import { fetchVideoList } from '@/api'
import { VideoCard } from '@/components'
import { userUidAtom } from '@/store'
import { YoutubeVideoType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'

const PlayList = () => {
  const [userUid] = useRecoilState(userUidAtom)
  const { data: videoList } = useQuery(
    ['videoList', userUid],
    () => fetchVideoList(userUid),
    { enabled: !!userUid },
  )

  return (
    <>
      <h3 className="sr-only_Title">PlayList</h3>
      {/* <FilterBtnList /> */}
      <ul className="videoList">
        {videoList?.map((video: YoutubeVideoType, index: number) => (
          <VideoCard key={index} video={video} />
        ))}
      </ul>
    </>
  )
}

export default PlayList
