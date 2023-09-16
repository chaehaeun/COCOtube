import { youtubeClient } from '@/api'
import { SearchVideoCard } from '@/components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ClipLoader } from 'react-spinners'
import styles from './Search.module.scss'
import { YoutubeVideoType } from '@/types'

const Search = () => {
  const { searchKeyword } = useParams()
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 200,
  })

  const {
    isLoading,
    data: videoData,
    fetchNextPage,

    hasNextPage,
  } = useInfiniteQuery(
    ['videos', searchKeyword],
    ({ pageParam = null }) =>
      youtubeClient.searchByKeyword(searchKeyword, pageParam),
    {
      getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
      staleTime: 1000 * 60 * 1000,
    },
  )

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  const videos = videoData?.pages.flatMap(page => page.video) || []

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
