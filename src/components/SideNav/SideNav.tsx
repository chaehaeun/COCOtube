import styles from './SideNav.module.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

interface SideNavProps {
  children: React.ReactNode
}

const SideNav = ({ children }: SideNavProps) => {
  return (
    <>
      <div>
        <div className={styles.sideNav}>
          <nav>
            <div>
              <ul>
                <li>
                  <NavLink to="/">
                    <AiOutlineHome /> 홈
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <AiOutlineHome /> 마이페이지
                  </NavLink>
                </li>
                <li>
                  <NavLink to="playlists">
                    <AiOutlineHome /> 좋아요 표시한 동영상
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <span>구독</span>
              <ul>
                <li></li>
              </ul>
            </div>
            <div>
              <ul></ul>
            </div>
          </nav>
          <ul>
            <li>다크모드</li>
            <li>로그아웃</li>
          </ul>
        </div>
        <div className={styles.topKeyword}></div>
      </div>
      <main>{children}</main>
    </>
  )
}

export default SideNav
