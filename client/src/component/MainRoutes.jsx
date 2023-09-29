import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Sign from './Auth/Sign'
import Login from './Auth/Login'
import TabLogin from './Auth/TabLogin'
import GoogleLoginCallbackPage from './Auth/GoogleLoginCallbackPage'
import Home from './Home/Home'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Sign/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signUp' element={<TabLogin/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/success' element={<GoogleLoginCallbackPage/>}/>
        </Routes>
      
    </div>
  )
}

export default MainRoutes
