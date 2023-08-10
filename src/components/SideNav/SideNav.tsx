import styles from './SideNav.module.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { BsFillMoonFill } from 'react-icons/bs'
import {
  AiOutlineLike,
  // AiFillLike
} from 'react-icons/ai'
import {
  HiOutlineUser,
  // HiUser
} from 'react-icons/hi'
import { IoLogOutOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

interface SideNavProps {
  children: React.ReactNode
}

const SideNav = ({ children }: SideNavProps) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.sideNav}>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <AiOutlineHome aria-hidden />
                <span>홈</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <HiOutlineUser />
                <span>마이페이지</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="playlists">
                <AiOutlineLike />
                <span>좋아요 표시한 동영상</span>
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
            <button type="button">
              <BsFillMoonFill aria-hidden />
              <span>다크모드</span>
            </button>
          </li>
          <li>
            <button type="button">
              <IoLogOutOutline aria-hidden />
              <span>로그아웃</span>
            </button>
          </li>
        </ul>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default SideNav
