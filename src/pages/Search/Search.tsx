import { youtubeClient } from '@/api'
import { FilterBtnList, SearchVideoCard } from '@/components'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ClipLoader } from 'react-spinners'
import styles from './Search.module.scss'
import { SearchFilter, YoutubeVideoType } from '@/types'
import { useInfiniteScroll } from '@/hooks'
import { useState } from 'react'

const Search = () => {
  const [filter, setFilter] = useState<SearchFilter>('relevance')
  const { searchKeyword } = useParams<{ searchKeyword: string }>()

  const {
    ref,
    isLoading,
    data: videoData,
  } = useInfiniteScroll(
    ['videos', searchKeyword, filter],
    ({ pageParam = undefined }) =>
      youtubeClient.searchByKeyword(searchKeyword, pageParam, filter),
  )

  const videos: YoutubeVideoType[] =
    videoData?.pages.flatMap(page => page.video) || []

  const handleFilter = (filter: string) => {
    setFilter(filter as SearchFilter)
  }

  return (
    <>
      <h2 className="sr-only_Title">{searchKeyword} 검색 결과</h2>
      <FilterBtnList
        type="search"
        handleFilter={handleFilter}
        activeFilter={filter}
      />
      <div className={styles.searchWrap}>
        {!isLoading && videos.length > 0 && (
          <>
            <ul className={styles.searchUl}>
              {videos.map((video: YoutubeVideoType) => (
                <SearchVideoCard type="search" key={uuidv4()} video={video} />
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
