import React from 'react'
import MyCalendar from "../calendar/MyCalendar"
import { useSelector } from 'react-redux'
import TabLogin from '../Auth/TabLogin'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Home = () => {
  const isAuth = useSelector(store=>store.authReducer.isAuth)
  const navigate = useNavigate()
  const token = Cookies.get('token') || JSON.parse(localStorage.getItem('token')) 
  if(!isAuth && !token){
    navigate('/signUp')
  }
  return (
    <>
      <MyCalendar/>
    </>
  )
}

export default Home
