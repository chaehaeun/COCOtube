import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authService } from '@/firebase-config'
import MoonLoader from 'react-spinners/ClipLoader'
import styles from './Profile.module.scss'

interface UserData {
  nickname: string
  photoURL: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        setUserData({ photoURL: user.photoURL!, nickname: user.displayName! })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      {loading ? (
        <MoonLoader color="#4e1ac3" size={40} />
      ) : userData ? (
        <button
          aria-label="프로필"
          type="button"
          className={styles.profile}
          onClick={() => navigate('/mypage')}
        >
          <div className={styles.imageContainer}>
            <img
              src={userData.photoURL}
              alt={userData.nickname}
              className={styles.image}
            />
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
