import { useEffect, useState } from 'react'
import { authService } from '@/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async authUser => {
      setUser(authUser)
    })

    return () => unsubscribe()
  }, [])

  return { user }
}

export default useAuth
