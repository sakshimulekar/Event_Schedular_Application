import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { loginSuccessWithToken } from '../redux/authReducer/action';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  // let Token = JSON.parse(localStorage.getItem('token')) 
  //dispatch(loginSuccessWithToken(Token))
  const location = useLocation()
  console.log(location.pathname)
  let auth = useSelector((store) => store.authReducer.isAuth);
  console.log(auth);
 // const navigate = useNavigate();

  return (
    <>
    {auth?children:(<Navigate state={location.pathname} to={'/signUp'}/>)}
    </>
  )
};

export default PrivateRoute;