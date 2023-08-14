import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authService } from '@/firebase-config'
import styles from './Profile.module.scss'

interface UserData {
  nickname: string
  photoURL: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        setUserData({ photoURL: user.photoURL!, nickname: user.displayName! })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      {userData ? (
        <button
          aria-label="프로필"
          type="button"
          className={styles.profile}
          onClick={() => navigate('/mypage')}
        >
          <div>
            <img src={userData.photoURL} alt={userData.nickname} />
          </div>
        </button>
      ) : (
        <Link to="signin" className={styles.signin}>
          로그인
        </Link>
      )}
    </>
  )
}

export default Profile
