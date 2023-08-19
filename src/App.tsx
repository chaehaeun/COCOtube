import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { Root, NotFound, AuthRoot } from '@/pages'
import { userUidAtom, userDataAtom, userLoadingAtom } from '@/store'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { authService, dbService } from '@/firebase-config'
import { doc, getDoc } from 'firebase/firestore'

const Home = lazy(() => import('@/pages/Home/Home'))
const MyPage = lazy(() => import('@/pages/MyPage/MyPage'))
const PlayList = lazy(() => import('@/pages/MyPage/PlayList'))
const Search = lazy(() => import('@/pages/Search'))
const SignIn = lazy(() => import('@/pages/AuthPages/SignIn'))
const SignUp = lazy(() => import('@/pages/AuthPages/SignUp'))
const MyPageInfo = lazy(() => import('@/pages/MyPage/MyPageInfo'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
        children: [
          {
            index: true,
            element: <PlayList />,
          },
          {
            path: 'info',
            element: <MyPageInfo />,
          },
        ],
      },
      {
        path: 'playlists',
        element: <PlayList />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
  {
    element: <AuthRoot />,
    errorElement: <NotFound />,
    children: [
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
])

function App() {
  const setUserUid = useSetRecoilState(userUidAtom)
  const setUserInfo = useSetRecoilState(userDataAtom)
  const setUserLoading = useSetRecoilState(userLoadingAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async authUser => {
      if (authUser) {
        try {
          setUserLoading(true)
          setUserUid(authUser.uid)
          const userInfoRef = doc(dbService, 'userInfo', authUser.uid)
          const userInfoSnap = await getDoc(userInfoRef)
          if (userInfoSnap.exists()) {
            const userInfoData = userInfoSnap.data()
            setUserInfo({
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
              email: authUser.email,
              introduce: userInfoData.introduce,
              bannerImg: userInfoData.banner,
            })
          } else {
            console.error('No such document!')
          }
        } catch (error) {
          console.error('Error fetching user info:', error)
        } finally {
          setUserLoading(false)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
