import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import LandingPage from './components/LandingPage';
import Admin from './components/Admin';
import Errorpage from './components/Errorpage';
import Signin from './components/Signin';

function App() {
  const baseURL = "http://localhost:4000"
  const userinfo = JSON.parse(localStorage.getItem('userinfo-Lucky'))
  const [loginsuccessfully, setloginsuccessfully] = useState(false)
  useEffect(() => {
    axios.post(`${baseURL}/login`, userinfo)
      .then(({ data }) => {
        if (data?.isAdmin) setloginsuccessfully(true)
      })
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    }, {
      path: '/admin',
      element: !loginsuccessfully ? <Signin /> : <Admin />
    },
    {
      path: "*",
      element: <Errorpage />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
