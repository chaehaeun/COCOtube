import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { Root, NotFound, AuthRoot } from '@/pages'

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
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
