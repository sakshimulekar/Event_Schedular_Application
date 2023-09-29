import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginSuccess } from '../../redux/authReducer/action';
import { useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
// import { useToast } from '@chakra-ui/react';


const GoogleLoginCallbackPage = () => {
  const dispatch = useDispatch();
  //const toast = useToast({position:"top"})
  const location = useLocation()
  const navigate = useNavigate()
  const isAuth = useSelector((store) => store.authReducer.token);
    console.log(isAuth,'8')
  useEffect(() => {
    // Get the token from local storage
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token,'12')
    // Assuming you have received the user data in the URL as well (modify the code accordingly)
    const searchParams = new URLSearchParams(window.location.search);
    const tokenfromurl=searchParams.get('token')
    console.log(tokenfromurl,'16')
    const userData = 
    //{
      //firstName: searchParams.get('firstName'),
      searchParams.get('picture')
      //id:searchParams.get('id')
    //};
    console.log(userData)
    const user = searchParams.get('username')
    console.log(user,'31 google login page')
    localStorage.setItem('token',JSON.stringify(tokenfromurl))
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('picture',JSON.stringify(userData))
    dispatch(googleLoginSuccess(userData,user, tokenfromurl))
    toast('🥳 login successfully!',{style:{fontWeight:'bold',fontSize:'20px',color:"black"}})
    
    console.log(location.state,'38')
    const { from } = location.state || { from: { pathname: '/' } };
    navigate(from);

  }, [dispatch]);

  console.log(isAuth);

  return <div style={{marginTop:'20%'}}>Logging in...</div>; // Or you can show a loading spinner
};

export default GoogleLoginCallbackPage;