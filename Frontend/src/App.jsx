import React from 'react'
import "./main.jsx"
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './component/Home.jsx'
import Logout from './pages/Logout.jsx'
import Header from './pages/Header.jsx'

function App() {
  return (
    <>
      <div className='h-screen bg-blue-950'>
        <Routes>
          <Route path='' element={< Header />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='/logout' element={<Logout />} />




        </Routes>
      </div>

    </>
  )
}

export default App

