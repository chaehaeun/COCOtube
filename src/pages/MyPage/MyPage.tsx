// import { MyPageComponent } from '@/components'
import { lazy, Suspense } from 'react'

const LazyMyPage = lazy(() => import('@/components/MyPage/MyPage'))

const MyPage = () => {
  return (
    <>
      <h2 className="sr-only_Title">MyPage</h2>
      <Suspense>
        <LazyMyPage type="myPage" />
      </Suspense>
    </>
  )
}

export default MyPage
