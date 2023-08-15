import { useEffect, useState } from 'react'
import { authService, dbService } from '@/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
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

  return { user, userInfo, isAuthChecked }
}

export default useAuth
