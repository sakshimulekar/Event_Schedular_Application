import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Stack, Heading, useToast, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaGoogle,FcGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { googlelogin, login } from '../../redux/authReducer/action';
import { useLocation, useNavigate } from 'react-router-dom';

const obj = {
  email: "",
  password: ""
};

const Login = () => {
  const [state, setState] = useState(obj);
  const {isAuth,message,isErr,user} = useSelector((store) => store.authReducer);
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(isAuth,message,isErr,': 18')
  const messageRef = useRef(message);
  const errorRef = useRef(message)
  const toast = useToast({position:"top"});
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async() => {
    // Handle login logic here
    let dataObj = {
      email: state.email,
      password: state.password
    };
    // Dispatch the login action
    await dispatch(login(dataObj))
    .then(()=>{
      navigate(location.state)
    })
   setState(obj)
    // Show toast notification based on authentication status
  };

//   const handleGoogleLogin = () => {
//     dispatch(googlelogin())
//   };
  useEffect(() => {
    console.log(isAuth, isErr);
    messageRef.current = message;
    console.log(messageRef);
  
    if (isAuth && !isToastDisplayed && messageRef.current === 'login success') {
      toast({
        title: 'Login Successful!',
        description: 'You are logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsToastDisplayed(true);
    }
  
    if (isErr && !isToastDisplayed && !isAuth) {
      toast({
        title: 'Login Failed! Invalid Credential',
        description: 'An error occurred during login.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsToastDisplayed(true);
    }
  }, [isAuth, isErr, isToastDisplayed, toast]);
  
  return (
    <Stack spacing={4} maxW="md" m="auto" p={4}>
      {/* <Heading>Log In</Heading> */}
      <Input type="email" placeholder="Email" name="email" value={state.email} onChange={handleClick} />
      <Input type="password" placeholder="Password" name="password" value={state.password} onChange={handleClick} />
      <Button
        size="lg"
        colorScheme="black"
        backgroundColor="black"
        color="white"
        _hover={{ backgroundColor: 'gray.700' }}
        _active={{ backgroundColor: 'gray.800' }}
        onClick={handleLogin}
      >
        Log In
      </Button>
      
      {/* <Button
        leftIcon={<FaGoogle />}
        colorScheme="blue"
        variant="solid"
        size="lg"
        onClick={handleGoogleLogin}
      >
        Log in with Google
      </Button> */}
      {/* </IconButton> */}
    </Stack>
  );
};

export default Login;