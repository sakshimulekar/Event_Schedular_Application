import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Sign from './Auth/Sign'
import Login from './Auth/Login'
import TabLogin from './Auth/TabLogin'
import GoogleLoginCallbackPage from './Auth/GoogleLoginCallbackPage'
import Home from './Home/Home'
import MyCalendar from './calendar/MyCalendar'
import PrivateRoute from './Auth/PrivateRoute'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Sign/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signUp' element={<TabLogin/>}/>
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path='/calendar' element={<MyCalendar/>}/>
            <Route path='/success' element={<GoogleLoginCallbackPage/>}/>
        </Routes>
      
    </div>
  )
}

export default MainRoutes
