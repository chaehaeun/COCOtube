import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/ClipLoader'
import styles from './Profile.module.scss'
import { useAuth } from '@/hooks'
import { authService } from '@/firebase-config'
import { photoURLAtom } from '@/store'
import { useRecoilState } from 'recoil'

interface UserData {
  nickname: string
  photoURL: string
}

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [photoURL] = useRecoilState(photoURLAtom)

  useEffect(() => {
    const unsubscribe =
      user && user.uid
        ? authService.onAuthStateChanged(authUser => {
            if (authUser) {
              setUserData({
                photoURL: authUser.photoURL || '',
                nickname: authUser.displayName || '',
              })
              setLoading(false)
            }
          })
        : null

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [user])

  return (
    <>
      {loading ? (
        <MoonLoader color="#4e1ac3" size={40} />
      ) : user ? (
        <button
          aria-label="프로필"
          type="button"
          className={styles.profile}
          onClick={() => navigate('/mypage')}
        >
          <div className={styles.imageContainer}>
            {photoURL ? (
              <img
                src={photoURL}
                alt={userData?.nickname}
                className={styles.image}
                loading="lazy"
              />
            ) : (
              <img
                src={userData?.photoURL}
                alt={userData?.nickname}
                className={styles.image}
                loading="lazy"
              />
            )}
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
