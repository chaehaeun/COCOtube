import { ChannelNav, MyHeader, MyInfo } from '@/components'
import styles from './MyPage.module.scss'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { useState } from 'react'
import { dbService, storageService } from '@/firebase-config'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

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
      <MyInfo
        type={type}
        userData={userData}
        handleEditMode={handleEditMode}
        isEdit={isEdit}
        onClick={handleSubmit}
      />
      <ChannelNav type={type} />
      <div className={styles.outletWrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default MyPageComponent
