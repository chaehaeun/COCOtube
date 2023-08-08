import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { SearchInput } from '@/components'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.tmp} />
      <h1>
        <Link to="/">
          <BsYoutube aria-hidden className=" text-brand" />
          <span>COCOtube</span>
        </Link>
      </h1>
      <SearchInput />
    </header>
  )
}

export default Header
