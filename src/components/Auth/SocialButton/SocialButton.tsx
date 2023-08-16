import styles from './SocialButton.module.scss'
import { authService, dbService } from '@/firebase-config'
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'
import { useModal } from '@/hooks'
import { Modal } from '@/components'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'

interface SocialButtonProps {
  method: 'google' | 'github' | 'twitter'
}

let icon = <div className={styles.google} />

const SocialButton = ({ method }: SocialButtonProps) => {
  const { showModal, content, closeModal, openModal } = useModal()
  const navigate = useNavigate()

  switch (method) {
    case 'google':
      icon = <div className={styles.google} />
      break
    case 'github':
      icon = <div className={styles.github} />
      break
    case 'twitter':
      icon = <div className={styles.twitter} />
      break
  }

  const handleClick = async () => {
    let provider: GithubAuthProvider | GoogleAuthProvider | TwitterAuthProvider

    try {
      switch (method) {
        case 'google':
          provider = new GoogleAuthProvider()
          break
        case 'github':
          provider = new GithubAuthProvider()
          break
        case 'twitter':
          provider = new TwitterAuthProvider()
          break
      }
      const userCredential = await signInWithPopup(authService, provider)

      const userDocRef = doc(dbService, 'userInfo', userCredential.user.uid)
      await setDoc(userDocRef, {
        introduce: '',
        likeChannels: [],
        likeVideos: [],
        banner: '',
      })

      if (userCredential.user) {
        console.log(userCredential.user)
        navigate('/')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      openModal('로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.socialBtn}
        aria-label={`${method} 로그인`}
        onClick={handleClick}
      >
        {icon}
      </button>
      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default SocialButton
