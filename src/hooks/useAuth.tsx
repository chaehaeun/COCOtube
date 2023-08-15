import { useEffect, useState } from 'react'
import { authService } from '@/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, authUser => {
      setUser(authUser)
      setIsAuthChecked(true)
    })

    return () => unsubscribe()
  }, [])

  return { user, isAuthChecked }
}

export default useAuth
