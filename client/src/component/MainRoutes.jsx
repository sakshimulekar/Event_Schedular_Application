import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Sign from './Auth/Sign'
import Login from './Auth/Login'
import TabLogin from './Auth/TabLogin'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Sign/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<TabLogin/>}/>
        </Routes>
      
    </div>
  )
}

export default MainRoutes
