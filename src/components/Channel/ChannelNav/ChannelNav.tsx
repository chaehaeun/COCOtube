import { NavLink } from 'react-router-dom'
import styles from './ChannelNav.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface ChannelNavProps {
  type: 'myPage' | 'channel'
  activeMenu?: string
  setActiveMenu?: Dispatch<SetStateAction<'videos' | 'info'>>
}

const ChannelNav = ({ type, activeMenu, setActiveMenu }: ChannelNavProps) => {
  const setActiveMenuHandler = (menu: 'videos' | 'info') => {
    if (!setActiveMenu) return
    setActiveMenu(menu)
  }

  const ChannelNavList = (
    <ul>
      <li>
        <button
          className={`${activeMenu === 'videos' && styles.active}`}
          type="button"
          onClick={() => setActiveMenuHandler('videos')}
        >
          동영상
        </button>
      </li>
      <li>
        <button
          className={`${activeMenu === 'info' && styles.active}`}
          type="button"
          onClick={() => setActiveMenuHandler('info')}
        >
          정보
        </button>
      </li>
    </ul>
  )

  const MyPageNavList = (
    <ul>
      <li>
        <NavLink
          to="/mypage"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          좋아요
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/mypage/info"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          정보
        </NavLink>
      </li>
    </ul>
  )

  return (
    <nav className={styles.channelNav}>
      {type === 'channel' ? ChannelNavList : MyPageNavList}
    </nav>
  )
}

export default ChannelNav
