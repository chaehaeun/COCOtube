import { dbService, storageService } from '@/firebase-config'
import { User, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'

export const updateDisplayName = async (
  newDisplayName: string,
  userUid: string,
  user: User,
) => {
  try {
    if (!userUid) return
    await updateProfile(user!, { displayName: newDisplayName })
  } catch (error) {
    console.error('Error updating display name:', error)
  }
}

export const updateIntroduce = async (
  newIntroduce: string,
  userUid: string,
) => {
  try {
    if (!userUid) return
    const userDocRef = doc(dbService, 'userInfo', userUid)
    await updateDoc(userDocRef, {
      introduce: newIntroduce,
    })
  } catch (error) {
    console.error('Error updating introduce:', error)
    throw error
  }
}

export const updateBannerImage = async (
  bannerDataUrl: string,
  userUid: string,
) => {
  try {
    if (!userUid) return

    const bannerImageRef = ref(storageService, `banner_images/${userUid}`)
    await uploadString(bannerImageRef, bannerDataUrl, 'data_url')
    const bannerUrl = await getDownloadURL(bannerImageRef)
    const userDocRef = doc(dbService, 'userInfo', userUid)
    await updateDoc(userDocRef, {
      banner: bannerUrl,
    })
  } catch (error) {
    console.error('Error updating banner image:', error)
  }
}

export const updateProfileImage = async (
  photoURL: string,
  userUid: string,
  user: User,
) => {
  try {
    if (!userUid) return
    const storageRef = ref(storageService, `profile_images/${userUid}`)
    await uploadString(storageRef, photoURL, 'data_url')
    const imageUrl = await getDownloadURL(storageRef)
    await updateProfile(user!, {
      photoURL: imageUrl,
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
  }
}
