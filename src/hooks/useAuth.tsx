import { useEffect, useMemo, useState } from 'react'
import { authService, dbService } from '@/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { photoURLAtom } from '@/store'
import { useSetRecoilState } from 'recoil'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
  const setPhotoURL = useSetRecoilState(photoURLAtom)
  // any는 나중에 데이터 양식이 확정 되면 수정하는 걸로
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async authUser => {
      setUser(authUser)
      setIsAuthChecked(true)

      if (authUser) {
        try {
          const userInfoRef = doc(dbService, 'userInfo', authUser.uid)
          const userInfoSnap = await getDoc(userInfoRef)
          if (userInfoSnap.exists()) {
            const userInfoData = userInfoSnap.data()
            setUserInfo(userInfoData)
            setPhotoURL(userInfoData.photoURL)
          } else {
            console.error('No such document!')
          }
        } catch (error) {
          console.error('Error fetching user info:', error)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  // 이전 데이터와 현재 데이터를 비교하여 리렌더링 방지
  const memoizedUserInfo = useMemo(() => userInfo, [userInfo])

  // userInfo를 업데이트하는 함수 추가
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUserInfo = (newUserInfo: Record<string, any>) => {
    setUserInfo(newUserInfo)
  }

  return { user, userInfo: memoizedUserInfo, isAuthChecked, updateUserInfo }
}

export default useAuth
