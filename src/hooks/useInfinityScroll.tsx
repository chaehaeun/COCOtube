import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchFilter, YoutubeVideoType } from '@/types'
import { STALE_TIME } from '@/constants'

type FetchData = ({
  pageParam,
}: {
  pageParam?: string | undefined
}) => Promise<{ video: YoutubeVideoType; nextPageToken: boolean }>

const useInfiniteScroll = (
  key: [string, string | undefined, SearchFilter | undefined],
  fetchData: FetchData,
  options = {},
) => {
  const { ref, inView } = useInView({
    threshold: 1,
  })

  const { isLoading, data, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(key, fetchData, {
      ...options,
      getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
      staleTime: STALE_TIME,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  return {
    ref,
    isLoading,
    data,
    fetchNextPage,
    error,
  }
}

export default useInfiniteScroll
