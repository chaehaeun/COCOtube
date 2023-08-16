import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import React, { lazy, Suspense } from 'react'

import {
  Root,
  Home,
  NotFound,
  // MyPage,
  SignIn,
  SignUp,
  Search,
  PlayList,
  AuthRoot,
} from '@/pages'
// import { Root, NotFound, AuthRoot } from '@/pages'

// const Home = lazy(() => import('@/pages/Home/Home'))
const MyPage = lazy(() => import('@/pages/MyPage/MyPage'))
// const PlayList = lazy(() => import('@/pages/MyPage/PlayList'))
// const Search = lazy(() => import('@/pages/Search'))
// const SignIn = lazy(() => import('@/pages/AuthPages/SignIn'))
// const SignUp = lazy(() => import('@/pages/AuthPages/SignUp'))

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <PlayList />,
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
  return <RouterProvider router={router} />
}

export default App
