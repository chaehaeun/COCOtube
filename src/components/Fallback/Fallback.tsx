import { ClipLoader } from 'react-spinners'
import styles from './Fallback.module.scss'

const Fallback = () => {
  return (
    <div className={styles.fallback}>
      <ClipLoader className={styles.spinner} size={50} color="#000" />
    </div>
  )
}

export default Fallback
