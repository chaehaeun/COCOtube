import { atom } from 'recoil'

interface UserDataState {
  displayName: string | null
  email: string | null
  photoURL: string | null
  introduce: string | null
  bannerImg: string | null
}

export interface Subscription {
  channelId: string
  channelName: string
  thumbnail: string
}

interface UserSubscriptionsState {
  subscriptions: Subscription[]
  likedVideos: string[]
}

export const userUidAtom = atom({
  key: 'userUidState',
  default: '',
})

export const userDataAtom = atom<UserDataState>({
  key: 'userDataState',
  default: {
    displayName: '',
    email: '',
    photoURL: '',
    introduce: '',
    bannerImg: '',
  },
})

export const userLoadingAtom = atom({
  key: 'userLoadingState',
  default: true,
})

export const isAuthCheckedAtom = atom({
  key: 'isAuthCheckedState',
  default: false,
})

export const isSocialLoginAtom = atom({
  key: 'isSocialLoginState',
  default: false,
})

export const userSubscriptionsAtom = atom<UserSubscriptionsState>({
  key: 'userSubscriptionsState',
  default: {
    subscriptions: [],
    likedVideos: [],
  },
})
