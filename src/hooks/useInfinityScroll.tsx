import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { YoutubeVideoType } from '@/types'

type FetchData = ({
  pageParam,
}: {
  pageParam?: string | undefined
}) => Promise<{ video: YoutubeVideoType; nextPageToken: boolean }>

const useInfiniteScroll = (
  key: [string, string | undefined],
  fetchData: FetchData,
  options = {},
) => {
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 200,
  })

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    key,
    fetchData,
    {
      ...options,
      getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
      staleTime: 1000 * 60 * 1000,
    },
  )

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
  }
}

export default useInfiniteScroll
