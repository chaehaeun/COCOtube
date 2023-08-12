import { Outlet } from 'react-router-dom'
import styles from './AuthRoot.module.scss'

const AuthRoot = () => {
  return (
    <div className={styles.authRoot}>
      <section className={styles.authWrap}>
        <Outlet />
      </section>
    </div>
  )
}

export default AuthRoot
