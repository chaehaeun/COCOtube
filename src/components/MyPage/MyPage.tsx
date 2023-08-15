import { ChannelHeader, ChannelNav, MyInfo } from '@/components'
import styles from './MyPage.module.scss'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks'

interface MyPageProps {
  type: 'myPage' | 'channel'
}

const MyPageComponent = ({ type }: MyPageProps) => {
  const { user, userInfo } = useAuth()

  const userData = {
    displayName: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    introduce: userInfo?.introduce,
  }

  return (
    <div className={styles.channelWrap}>
      <ChannelHeader type={type} />
      <MyInfo type={type} userData={userData} />
      <ChannelNav type={type} />
      <div className={styles.outletWrap}>
        <Outlet />
      </div>
    </div>
  )
}

export default MyPageComponent
