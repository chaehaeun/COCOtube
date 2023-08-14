import styles from './AuthButton.module.scss'

interface AuthButtonProps {
  type: 'button' | 'submit'
  mode: 'signIn' | 'signUp' | 'cancel'
  onClick?: () => void
  children: React.ReactNode
}

const className = `${styles.button}`

const AuthButton = ({ type, children, mode, onClick }: AuthButtonProps) => {
  switch (mode) {
    case 'signIn':
      className.concat(` ${styles.signIn}`)
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default AuthButton
