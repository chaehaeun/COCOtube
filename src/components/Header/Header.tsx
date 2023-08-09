import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { Profile, SearchInput } from '@/components'
import styles from './Header.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isSearch, setIsSearch] = useState(false)

  const handleSearch = () => {
    setIsSearch(!isSearch)
  }

  // 화면 다시 커질 때 강제로 isSearch를 false로 만들어줌
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsSearch(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className={`${styles.header} ${isSearch ? styles.hide : ''}`}>
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
      <SearchInput isShow={isSearch} setIsShow={setIsSearch} />
      <div>
        <button
          type="button"
          onClick={handleSearch}
          className={styles.showSearch}
          aria-label="검색"
        >
          <AiOutlineSearch aria-hidden />
        </button>
        <Profile />
      </div>
    </header>
  )
}

export default Header
