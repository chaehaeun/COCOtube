import styles from './SocialButton.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'

interface SocialButtonProps {
  method: 'google' | 'github' | 'twitter'
}

let icon = <FcGoogle aria-hidden />

const SocialButton = ({ method }: SocialButtonProps) => {
  switch (method) {
    case 'google':
      icon = <FcGoogle aria-hidden />
      break
    case 'github':
      icon = <BsGithub aria-hidden />
      break
    case 'twitter':
      icon = <FaTwitter aria-hidden className={styles.twitter} />
      break
  }

  const handleClick = () => {}

  return (
    <button
      type="button"
      className={styles.socialBtn}
      aria-label={`${method} 로그인`}
      onClick={handleClick}
    >
      {icon}
    </button>
  )
}

export default SocialButton
