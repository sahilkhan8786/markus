import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Rootlayout from "./layouts/Rootlayout"
import LandingPage from "./pages/LandingPage"
import SecondPage from "./pages/SecondPage"
import DetailsPage from "./pages/DetailsPage"
import ParkPanorama from "./pages/ParkPanorama"

const router = createBrowserRouter([{
  path: '/',
  element: <Rootlayout />,
  children: [
    {
      index: true,
      element: <LandingPage />
    },


    {
      path: '/second',
      element: <SecondPage />
    },
    {
      path: '/learn/:details',
      element: <DetailsPage />
    },
    {
      path: '/park-panorama',
      element: <ParkPanorama />
    },
  ]
}])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}