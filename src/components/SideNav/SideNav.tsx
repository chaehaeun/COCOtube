import { fetchSubscriptionList } from '@/api'
import { Modal } from '@/components'
import { authService } from '@/firebase-config'
import { useModal, useWindowResize } from '@/hooks'
import { darkmodeAtom, userUidAtom } from '@/store'
import { Subscription } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styles from './SideNav.module.scss'

interface SideNavProps {
  isSideNav: boolean
  children: React.ReactNode
  setIsSideNav: React.Dispatch<React.SetStateAction<boolean>>
}

const SideNav = ({ children, isSideNav, setIsSideNav }: SideNavProps) => {
  const [userUid] = useRecoilState(userUidAtom)
  const [darkmode, setDarkmode] = useRecoilState(darkmodeAtom)
  const { showModal, content, closeModal, openModal } = useModal()

  const {
    data: subscriptions,
    refetch,
    isStale,
  } = useQuery(
    ['subscriptions', userUid],
    () => fetchSubscriptionList(userUid),
    { enabled: !!userUid },
  )

  useEffect(() => {
    if (isStale && userUid) {
      refetch()
    }
  }, [isStale, userUid, refetch])

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
                      <div className={styles.solidHome} />
                      <span className={styles.span}>홈</span>
                    </>
                  ) : (
                    <>
                      <div className={styles.outlineHome} />
                      <span className={styles.span}>홈</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="mypage"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {({ isActive }) => {
                  return isActive ? (
                    <>
                      <div className={styles.solidUser} />
                      <span className={styles.span}>마이페이지</span>
                    </>
                  ) : (
                    <>
                      <div className={styles.user} />
                      <span className={styles.span}>마이페이지</span>
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
                      <div className={styles.solidLike} />
                      <span className={styles.span}>좋아요 표시한 동영상</span>
                    </>
                  ) : (
                    <>
                      <div className={styles.like} />
                      <span className={styles.span}>좋아요 표시한 동영상</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
          </ul>
          <div>
            <span className={styles.subscribeList}>구독</span>
            <ul>
              {subscriptions?.map(
                (subscription: Subscription, index: number) => (
                  <li key={index}>
                    <NavLink to={`/channel/${subscription.channelId}`}>
                      <div className={styles.channelProfile}>
                        <img
                          src={subscription.thumbnail}
                          alt={subscription.channelName}
                        />
                      </div>
                      <span className={styles.span}>
                        {subscription.channelName}
                      </span>
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
        <ul>
          <li>
            <button type="button" onClick={toggleDarkmode}>
              {darkmode ? (
                <>
                  <div className={styles.sun} />
                  <span className={styles.span}>라이트모드</span>
                </>
              ) : (
                <>
                  <div className={styles.moon} />
                  <span className={styles.span}>다크모드</span>
                </>
              )}
            </button>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              <div className={styles.logout} />
              <span className={styles.span}>로그아웃</span>
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
