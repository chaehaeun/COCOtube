import { youtubeClient } from '@/api'
import { SearchVideoCard } from '@/components'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ClipLoader } from 'react-spinners'
import styles from './Search.module.scss'
import { YoutubeVideoType } from '@/types'
import { useInfiniteScroll } from '@/hooks'

const Search = () => {
  const { searchKeyword } = useParams<{ searchKeyword: string }>()
  const {
    ref,
    isLoading,
    data: videoData,
  } = useInfiniteScroll(
    ['videos', searchKeyword],
    ({ pageParam = undefined }) =>
      youtubeClient.searchByKeyword(searchKeyword, pageParam),
  )

  const videos: YoutubeVideoType[] =
    videoData?.pages.flatMap(page => page.video) || []

  return (
    <>
      <h2 className="sr-only_Title">{searchKeyword} 검색 결과</h2>
      <div className={styles.searchWrap}>
        {!isLoading && videos.length > 0 && (
          <>
            <ul className={styles.searchUl}>
              {videos.map((video: YoutubeVideoType) => (
                <SearchVideoCard key={uuidv4()} video={video} />
              ))}
            </ul>
            <div ref={ref} className={styles.spinner}>
              <ClipLoader />
            </div>
          </>
        )}

        {isLoading && (
          <div className={styles.spinner}>
            <ClipLoader />
          </div>
        )}
      </div>
    </>
  )
}

export default Search
