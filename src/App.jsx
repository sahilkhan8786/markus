import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Rootlayout from "./layouts/Rootlayout"
import LandingPage from "./pages/LandingPage"
import FirstPage from "./pages/FirstPage"
import SecondPage from "./pages/SecondPage"

const router = createBrowserRouter([{
  path: '/',
  element: <Rootlayout />,
  children: [
    {
      index: true,
      element: <LandingPage />
    },
    {
      path: '/first',
      element: <FirstPage />
    },
    {
      path: '/second',
      element: <SecondPage />
    },
  ]
}])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}