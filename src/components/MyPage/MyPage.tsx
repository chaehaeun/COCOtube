import { MyHeader } from '@/components'
import styles from './MyPage.module.scss'
import { useAuth } from '@/hooks'
import { Suspense, lazy, useState } from 'react'
import { dbService, storageService } from '@/firebase-config'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

const LazyMyInfo = lazy(() => import('@/components/MyPage/MyInfo/MyInfo'))
const LazyChannelNav = lazy(
  () => import('@/components/Channel/ChannelNav/ChannelNav'),
)
const LazyOutlet = lazy(() =>
  import('react-router-dom').then(module => ({ default: module.Outlet })),
)
interface MyPageProps {
  type: 'myPage' | 'channel'
}

const MyPageComponent = ({ type }: MyPageProps) => {
  const { user, userInfo, updateUserInfo } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [update, setUpdate] = useState({
    introduce: '',
    banner: '',
    displayName: '',
    photoURL: '',
  })

  const userData = {
    displayName: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    introduce: userInfo?.introduce,
    bannerImg: userInfo?.banner,
  }

  const updateBannerImage = async (bannerUrl: string) => {
    try {
      if (!user) return
      const userDocRef = doc(dbService, 'userInfo', user.uid)
      await updateDoc(userDocRef, {
        banner: bannerUrl,
      })
    } catch (error) {
      console.error('Error updating user document:', error)
    }
  }

  const handleSubmit = async () => {
    if (update.banner) {
      const bannerImageRef = ref(storageService, `banner_images/${user?.uid}`)
      await uploadString(bannerImageRef, update.banner, 'data_url')
      const bannerUrl = await getDownloadURL(bannerImageRef)

      await updateBannerImage(bannerUrl)
      updateUserInfo({ ...userInfo, banner: bannerUrl })
      setIsEdit(false)
    } else {
      setIsEdit(false)
    }
  }

  const handleImg = (url: string) => {
    setUpdate(prev => ({ ...prev, banner: url }))
  }

  const handleEditMode = () => {
    setIsEdit(prev => !prev)
  }

  return (
    <div className={styles.channelWrap}>
      <MyHeader
        bannerImg={userData.bannerImg}
        isEdit={isEdit}
        onChange={handleImg}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMyInfo
          type={type}
          userData={userData}
          handleEditMode={handleEditMode}
          isEdit={isEdit}
          onClick={handleSubmit}
        />
      </Suspense>
      <LazyChannelNav type={type} />
      <div className={styles.outletWrap}>
        <LazyOutlet />
      </div>
    </div>
  )
}

export default MyPageComponent
