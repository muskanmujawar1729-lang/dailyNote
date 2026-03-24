import React from 'react'
import "./main.jsx"
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Home from './component/Home.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Logout from './pages/Logout.jsx'
import Header from './pages/Header.jsx'

function App() {
  return (
    <>
      <div className='h-screen bg-blue-950'>
        <Routes>
          <Route path='' element={< Header/>} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path="/verifyEmail" element={<VerifyEmail />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/forgetpass' element={<ForgetPassword />} />
          <Route path='/verifyotp/:email' element={<VerifyOtp />} />
          <Route path='home' element={<Home />} />
          <Route path='/logout' element={<Logout />} />

          <Route path="/changepassword/:email" element={<ChangePassword />} />



        </Routes>
      </div>

    </>
  )
}

export default App

