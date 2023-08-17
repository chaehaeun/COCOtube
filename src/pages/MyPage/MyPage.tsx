// import { MyPageComponent } from '@/components'
import { Modal } from '@/components'
import { useAuth, useModal } from '@/hooks'
import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LazyMyPage = lazy(() => import('@/components/MyPage/MyPage'))

const MyPage = () => {
  const { user, isAuthChecked } = useAuth()
  const { showModal, content, openModal, closeModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthChecked && !user) {
      // 로그인 상태가 체크되었고 로그인되어 있지 않다면 모달 표시
      openModal('로그인이 필요한 페이지입니다.', () => navigate('/signin'))
    }
  }, [user, isAuthChecked])

  return (
    <>
      <h2 className="sr-only_Title">MyPage</h2>
      <Suspense>
        <LazyMyPage type="myPage" />
      </Suspense>
      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default MyPage
