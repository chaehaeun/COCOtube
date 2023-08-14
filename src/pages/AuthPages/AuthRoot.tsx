import { Outlet, useLocation } from 'react-router-dom'
import styles from './AuthRoot.module.scss'

const AuthRoot = () => {
  const location = useLocation()
  const isSignInPage = location.pathname.includes('signin')
  const pageTitle = isSignInPage ? '로그인' : '회원가입'

  return (
    <div className={styles.authRoot}>
      <section className={styles.authWrap}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <Outlet />
      </section>
    </div>
  )
}

export default AuthRoot
