import { Suspense, lazy, useCallback, useState } from 'react'
import { MyHeader, InfoLoadingSkeleton, Modal } from '@/components'
import styles from './MyPage.module.scss'
import { useAuth, useModal } from '@/hooks'
import { dbService, storageService } from '@/firebase-config'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { photoURLAtom } from '@/store'
import { useSetRecoilState } from 'recoil'

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
  const { showModal, openModal, content, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [update, setUpdate] = useState({
    introduce: '',
    banner: '',
    displayName: '',
    photoURL: '',
  })
  const setPhotoURL = useSetRecoilState(photoURLAtom)

  const userData = {
    displayName: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    introduce: userInfo?.introduce,
    bannerImg: userInfo?.banner,
  }

  const updateDisplayName = async (newDisplayName: string) => {
    try {
      if (!user) return

      await updateProfile(user, {
        displayName: newDisplayName,
      })
      updateUserInfo({ ...userInfo, displayName: newDisplayName })
    } catch (error) {
      console.error('Error updating display name:', error)
    }
  }

  const updateIntroduce = async (newIntroduce: string) => {
    try {
      if (!user) return
      const userDocRef = doc(dbService, 'userInfo', user.uid)
      await updateDoc(userDocRef, {
        introduce: newIntroduce,
      })

      updateUserInfo({ ...userInfo, introduce: newIntroduce })
    } catch (error) {
      console.error('Error updating introduce:', error)
      throw error
    }
  }

  const updateBannerImage = async (bannerDataUrl: string) => {
    try {
      if (!user) return
      const bannerImageRef = ref(storageService, `banner_images/${user.uid}`)
      await uploadString(bannerImageRef, bannerDataUrl, 'data_url')
      const bannerUrl = await getDownloadURL(bannerImageRef)

      const userDocRef = doc(dbService, 'userInfo', user.uid)
      await updateDoc(userDocRef, {
        banner: bannerUrl,
      })

      updateUserInfo({ ...userInfo, banner: bannerUrl })
    } catch (error) {
      console.error('Error updating banner image:', error)
    }
  }

  const updateProfileImage = async (photoURL: string) => {
    try {
      if (!user) return

      // 업로드할 이미지 파일을 data URL로 변환
      const storageRef = ref(storageService, `profile_images/${user.uid}`)
      await uploadString(storageRef, photoURL, 'data_url')

      // 업로드한 이미지의 다운로드 URL을 가져옴
      const imageUrl = await getDownloadURL(storageRef)

      await updateProfile(user, {
        photoURL: imageUrl,
      })
      updateUserInfo({ ...userInfo, photoURL: imageUrl })
      setPhotoURL(imageUrl)
    } catch (error) {
      console.error('Error updating user profile:', error)
    }
  }

  const handleSubmit = useCallback(async () => {
    try {
      if (update.displayName) {
        await updateDisplayName(update.displayName)
      }
      if (update.banner) {
        await updateBannerImage(update.banner)
      }
      if (update.photoURL) {
        await updateProfileImage(update.photoURL)
      }
      await updateIntroduce(update.introduce)
    } catch {
      openModal('프로필을 수정하는데 실패했습니다.')
    } finally {
      setIsEdit(false)
    }
  }, [update, user, userInfo, updateUserInfo, openModal])

  const handleImg = useCallback((banner: string) => {
    setUpdate(prev => ({ ...prev, banner }))
  }, [])

  const handleInfo = useCallback(
    (data: Record<string, string>) => {
      setUpdate(prev => ({ ...prev, ...data }))
    },
    [update.banner, update.displayName, update.introduce, update.photoURL],
  )

  const handleEditMode = useCallback(() => {
    setIsEdit(prev => !prev)
  }, [])

  return (
    <div className={styles.channelWrap}>
      <MyHeader
        bannerImg={userData.bannerImg}
        isEdit={isEdit}
        onChange={handleImg}
      />
      <Suspense fallback={<InfoLoadingSkeleton />}>
        <LazyMyInfo
          type={type}
          userData={userData}
          handleEditMode={handleEditMode}
          isEdit={isEdit}
          onClick={handleSubmit}
          onDataChange={handleInfo}
        />
      </Suspense>
      <LazyChannelNav type={type} />
      <div className={styles.outletWrap}>
        <LazyOutlet />
      </div>
      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </div>
  )
}

export default MyPageComponent
