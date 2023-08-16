import { Link } from 'react-router-dom'
import { Profile, SearchInput } from '@/components'
import styles from './Header.module.scss'
import { useState } from 'react'
import { useWindowResize } from '@/hooks'

interface HeaderProps {
  setIsSideNav: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ setIsSideNav }: HeaderProps) => {
  const [isSearch, setIsSearch] = useState(false)

  const handleSearch = () => {
    setIsSearch(!isSearch)
  }

  useWindowResize(() => {
    if (window.innerWidth > 768) {
      setIsSearch(false)
    }
  })

  return (
    <header className={`${styles.header} ${isSearch ? styles.hide : ''}`}>
      <div>
        <button
          type="button"
          aria-label="사이드바 토글"
          className={styles.hamburger}
          onClick={() => setIsSideNav(prev => !prev)}
        >
          <span aria-hidden></span>
          <span aria-hidden></span>
          <span aria-hidden></span>
        </button>
        <h1>
          <Link to="/">
            <div className={styles.youtube} />
            <span>COCOtube</span>
          </Link>
        </h1>
      </div>
      <SearchInput isShow={isSearch} setIsShow={setIsSearch} />
      <div>
        <button
          type="button"
          onClick={handleSearch}
          className={styles.showSearch}
          aria-label="검색"
        >
          <div className={styles.searchIcon} />
        </button>
        <Profile />
      </div>
    </header>
  )
}

export default Header
