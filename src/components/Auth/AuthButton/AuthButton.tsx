import styles from './AuthButton.module.scss'

interface AuthButtonProps {
  type: 'button' | 'submit'
  mode: 'signIn' | 'signUp' | 'navigate'
  onClick?: () => void
  children: React.ReactNode
}

let className = `${styles.button}`

const AuthButton = ({ type, children, mode, onClick }: AuthButtonProps) => {
  switch (mode) {
    case 'signIn':
      className = `${styles.button} ${styles.signIn}`
      break
    case 'signUp':
      className = `${styles.button} ${styles.signUp}`
      break
    case 'navigate':
      className = `${styles.button} ${styles.navigate}`
      break
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default AuthButton
