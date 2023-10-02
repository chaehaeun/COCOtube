import { dbService, storageService } from '@/firebase-config'
import { Subscription, YoutubeVideoType } from '@/types'
import { User, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

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

export const updateSubscriptions = async (
  userUid: string,
  channelId: string,
  channelName: string,
  thumbnail: string,
) => {
  if (!userUid || !channelId || !thumbnail) return

  const userDocRef = doc(dbService, 'channelList', userUid)
  const userDocSnap = await getDoc(userDocRef)

  const channelData = {
    channelId: channelId,
    channelName: channelName,
    thumbnail: thumbnail,
  }

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      channelList: [channelData],
    })

    return
  }

  const channelListArray = userDocSnap.data()?.channelList || []

  if (
    channelListArray.some((item: Subscription) => item.channelId === channelId)
  ) {
    await updateDoc(userDocRef, {
      channelList: channelListArray.filter(
        (item: Subscription) => item.channelId !== channelId,
      ),
    })
  } else {
    await updateDoc(userDocRef, {
      channelList: [...channelListArray, channelData],
    })
  }
}

export const updateLikedVideos = async (
  userUid: string,
  video: YoutubeVideoType,
) => {
  if (!userUid) return

  const userDocRef = doc(dbService, 'videoList', userUid)
  const userDocSnap = await getDoc(userDocRef)

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      videoList: [video],
    })

    return
  }

  const videoListArray = userDocSnap.data()?.videoList || []

  if (videoListArray.some((item: YoutubeVideoType) => item.id === video.id)) {
    await updateDoc(userDocRef, {
      videoList: videoListArray.filter(
        (item: YoutubeVideoType) => item.id !== video.id,
      ),
    })
  } else {
    await updateDoc(userDocRef, {
      videoList: [...videoListArray, video],
    })
  }
}

export const fetchVideoList = async (userUid: string) => {
  const userDocRef = doc(dbService, 'videoList', userUid)
  const userDocSnap = await getDoc(userDocRef)

  return userDocSnap.data()?.videoList || []
}

export const fetchSubscriptionList = async (userUid: string) => {
  const userDocRef = doc(dbService, 'channelList', userUid)
  const userDocSnap = await getDoc(userDocRef)

  return userDocSnap.data()?.channelList || []
}
