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
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'mypage',
        element: <MyPage />,
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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
