// import { MyPageComponent } from '@/components'
import { Modal } from '@/components'
import { useModal } from '@/hooks'
import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthCheckedAtom, userUidAtom } from '@/store'
import { useRecoilState } from 'recoil'

const LazyMyPage = lazy(() => import('@/components/MyPage/MyPageComponent'))

const MyPage = () => {
  const [userUid] = useRecoilState(userUidAtom)
  const [isAuthChecked] = useRecoilState(isAuthCheckedAtom)
  const { showModal, content, openModal, closeModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthChecked && !userUid) {
      openModal('로그인이 필요한 페이지입니다.', () => navigate('/signin'))
    }
  }, [userUid, isAuthChecked])

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
