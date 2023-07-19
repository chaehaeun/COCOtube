import NotFound from "./pages/NotFound.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Videos from "./pages/Videos.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      {
        path: "videos",
        element: <Videos />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
