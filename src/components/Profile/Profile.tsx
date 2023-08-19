import { Link, useNavigate } from 'react-router-dom'
import styles from './Profile.module.scss'
import { userDataAtom, userLoadingAtom, userUidAtom } from '@/store'
import { useRecoilState } from 'recoil'

const Profile = () => {
  const navigate = useNavigate()
  const [userUid] = useRecoilState(userUidAtom)
  const [userDataState] = useRecoilState(userDataAtom)
  const [userLoading] = useRecoilState(userLoadingAtom)

  return (
    <>
      {userLoading ? (
        // <MoonLoader color="#4e1ac3" size={40} />
        <div className={styles.skeleton} />
      ) : userUid ? (
        <button
          aria-label="프로필"
          type="button"
          className={styles.profile}
          onClick={() => navigate('/mypage')}
        >
          <div className={styles.imageContainer}>
            <img
              src={userDataState.photoURL!}
              alt={userDataState.displayName!}
              className={styles.image}
              loading="lazy"
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
