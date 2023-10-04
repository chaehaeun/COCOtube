import { NavLink } from 'react-router-dom'
import styles from './ChannelNav.module.scss'

interface ChannelNavProps {
  type: 'myPage' | 'channel'
}

const ChannelNav = ({ type }: ChannelNavProps) => {
  const ChannelNavList = (
    <ul>
      <li>
        <NavLink
          to="/mypage"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          동영상
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/mypage"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          재생목록
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/mypage"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          정보
        </NavLink>
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
