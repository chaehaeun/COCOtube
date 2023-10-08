import { authService, dbService } from '@/firebase-config'
import { AuthRoot, NotFound, Root, VideoDetail } from '@/pages'
import {
  isAuthCheckedAtom,
  userDataAtom,
  userLoadingAtom,
  userUidAtom,
} from '@/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Suspense, lazy, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Fallback } from '@/components'

const Home = lazy(() => import('@/pages/Home/Home'))
const MyPage = lazy(() => import('@/pages/MyPage/MyPage'))
const PlayList = lazy(() => import('@/pages/MyPage/PlayList'))
const Search = lazy(() => import('@/pages/Search/Search'))
const SignIn = lazy(() => import('@/pages/AuthPages/SignIn'))
const SignUp = lazy(() => import('@/pages/AuthPages/SignUp'))
const MyPageInfo = lazy(() => import('@/pages/MyPage/MyPageInfo'))
const Channel = lazy(() => import('@/components/Channel/Channel'))

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
        path: '/:searchKeyword',
        element: <Search />,
      },
      {
        path: '/video/:videoId',
        element: <VideoDetail />,
      },
      {
        path: '/channel/:channelId',
        element: <Channel />,
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
  const [userUid, setUserUid] = useRecoilState(userUidAtom)
  const setUserInfo = useSetRecoilState(userDataAtom)
  const setUserLoading = useSetRecoilState(userLoadingAtom)
  const setIsAuthChecked = useSetRecoilState(isAuthCheckedAtom)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async authUser => {
      if (authUser) {
        setUserUid(authUser.uid)

        try {
          setIsAuthChecked(true)
          setUserLoading(true)
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
          }
        } catch (error) {
          console.error('Error fetching user info:', error)
        } finally {
          setUserLoading(false)
        }
      } else {
        setUserLoading(false)
      }
    })

    return () => unsubscribe()
  }, [userUid])

  return (
    <Suspense fallback={<Fallback />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
