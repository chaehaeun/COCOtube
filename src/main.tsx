import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/NotFound.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Videos from "./pages/Videos.tsx";
import VideoDetail from "./pages/VideoDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      {
        path: "videos",
        element: <Videos />,
        children: [
          { path: ":id", element: <Videos /> },
          { path: "watch/:videoId", element: <VideoDetail /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
