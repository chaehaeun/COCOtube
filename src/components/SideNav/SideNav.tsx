import styles from './SideNav.module.scss'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { HiOutlineUser, HiUser } from 'react-icons/hi'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { darkmodeAtom } from '@/store'
import { useModal, useWindowResize } from '@/hooks'
import { Modal } from '@/components'
import { authService } from '@/firebase-config'

interface SideNavProps {
  isSideNav: boolean
  children: React.ReactNode
  setIsSideNav: React.Dispatch<React.SetStateAction<boolean>>
}

// todo : 코드 리팩토링

const SideNav = ({ children, isSideNav, setIsSideNav }: SideNavProps) => {
  const [darkmode, setDarkmode] = useRecoilState(darkmodeAtom)
  const { showModal, content, closeModal, openModal } = useModal()

  const toggleDarkmode = () => {
    setDarkmode(!darkmode)
  }

  useWindowResize(() => {
    if (window.innerWidth > 1024) {
      setIsSideNav(false)
    }
  })

  const handleLogout = async () => {
    try {
      await authService.signOut()
      openModal('정상 로그아웃 되었습니다.')
    } catch (error) {
      console.error('로그아웃 에러:', error)
    }
  }

  const handleModal = () => {
    closeModal()
    window.location.reload()
  }

  return (
    <div className={styles.wrap}>
      <div className={`${styles.sideNav} ${isSideNav ? styles.show : ''}`}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {({ isActive }) => {
                  return isActive ? (
                    <>
                      <AiFillHome aria-hidden />
                      <span>홈</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineHome aria-hidden />
                      <span>홈</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="mypage"
                end
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {({ isActive }) => {
                  return isActive ? (
                    <>
                      <HiUser aria-hidden />
                      <span>마이페이지</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineUser aria-hidden />
                      <span>마이페이지</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="playlists"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {({ isActive }) => {
                  return isActive ? (
                    <>
                      <AiFillLike aria-hidden />
                      <span>좋아요 표시한 동영상</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineLike aria-hidden />
                      <span>좋아요 표시한 동영상</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
          </ul>
          <div>
            <span className={styles.subscribeList}>구독</span>
            <ul>
              <li>
                <NavLink to="/">
                  <div className={styles.channelProfile} />
                  <span>채널명</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <ul>
          <li>
            <button type="button" onClick={toggleDarkmode}>
              {darkmode ? (
                <>
                  <BsFillSunFill aria-hidden />
                  <span>라이트모드</span>
                </>
              ) : (
                <>
                  <BsFillMoonFill aria-hidden />
                  <span>다크모드</span>
                </>
              )}
            </button>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              <RiLogoutBoxRLine aria-hidden />
              <span>로그아웃</span>
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.backDrop} ${isSideNav ? styles.show : ''}`}
        onClick={() => setIsSideNav(prev => !prev)}
      />
      <main className={styles.main}>{children}</main>
      {showModal && <Modal onClose={handleModal}>{content}</Modal>}
    </div>
  )
}

export default SideNav
