import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { Profile, SearchInput } from '@/components'
import styles from './Header.module.scss'
import { MdKeyboardVoice } from 'react-icons/md'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <button
          type="button"
          aria-label="사이드바 열기"
          className={styles.hamburger}
        >
          <span aria-hidden></span>
          <span aria-hidden></span>
          <span aria-hidden></span>
        </button>
        <h1>
          <Link to="/">
            <BsYoutube aria-hidden className=" text-brand" />
            <span>COCOtube</span>
          </Link>
        </h1>
      </div>
      <SearchInput />
      <div>
        <button type="button" className={styles.showSearch} aria-label="검색">
          <MdKeyboardVoice aria-hidden />
        </button>
        <Profile />
      </div>
    </header>
  )
}

export default Header
