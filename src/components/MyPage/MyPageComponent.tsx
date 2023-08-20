import { Suspense, lazy, useCallback, useState } from 'react'
import { MyHeader, InfoLoadingSkeleton, ChannelRoot } from '@/components'
import styles from './MyPageComponent.module.scss'
import { userDataAtom } from '@/store'
import { useRecoilState } from 'recoil'

const LazyMyInfo = lazy(() => import('@/components/MyPage/MyInfo/MyInfo'))
const LazyChannelNav = lazy(
  () => import('@/components/Channel/ChannelNav/ChannelNav'),
)

interface MyPageProps {
  type: 'myPage' | 'channel'
}

const MyPageComponent = ({ type }: MyPageProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [userDataState] = useRecoilState(userDataAtom)
  const [bannerURL, setBannerURL] = useState<string>(
    userDataState.bannerImg || '',
  )

  const handleEditMode = useCallback(() => {
    setIsEdit(prev => !prev)
  }, [])

  const handleBannerImg = (url: string) => {
    setBannerURL(url)
  }

  return (
    <div className={styles.channelWrap}>
      <MyHeader
        isEdit={isEdit}
        bannerImg={bannerURL}
        handleBanner={handleBannerImg}
      />
      <Suspense fallback={<InfoLoadingSkeleton />}>
        <LazyMyInfo
          handleEditMode={handleEditMode}
          isEdit={isEdit}
          bannerURL={bannerURL}
        />
      </Suspense>
      <LazyChannelNav type={type} />
      <ChannelRoot />
    </div>
  )
}

export default MyPageComponent
