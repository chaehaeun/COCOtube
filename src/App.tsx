import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Root,
  Home,
  NotFound,
  MyPage,
  SignIn,
  SignUp,
  Search,
  PlayList,
  AuthRoot,
  SignUpCompletion,
} from '@/pages'

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
      { path: 'signup-completion', element: <SignUpCompletion /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
