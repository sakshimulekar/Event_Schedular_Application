import React, { useEffect, useState ,useRef} from 'react';
import { Input, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/authReducer/action';

const dataobj = {
  name: "",
  email: "",
  password: ""
};

const Sign = () => {
  const toast = useToast({position:"bottom"});
  const [state, setState] = useState(dataobj);
  const [errors, setErrors] = useState(dataobj); 
  const [isToastDisplayed, setIsToastDisplayed] = useState(false); // State for validation errors
  const authReducer = useSelector(store => store.authReducer); // Access the entire authReducer state
  const { isAuth, message, isLoad, user } = authReducer; 
  const messageRef = useRef(message);
  //console.log(isAuth, message, isLoad, user,'78');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  

  const handleSubmit = async() => {
    // Validate form fields
    const newErrors = {};
    let isValid = true;

    if (!state.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // if (!state.last.trim()) {
    //   newErrors.last = "Lastname is required";
    //   isValid = false;
    // }

    if (!state.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!validatePassword(state.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one special character, and one number";
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    if (isValid) {
      let obj = {
        username: state.name,
        email: state.email,
        password: state.password
      };

      await dispatch(signup(obj))

      setState(dataobj);
    }
  };
  useEffect(() => {
    messageRef.current = message;

    if (isAuth && !isToastDisplayed) {
      // Display different toasts based on the message content
      if (messageRef.current === 'registered already! Please Log-In') {
        toast({
          title: 'Registration Failed',
          description: 'You are already registered.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (messageRef.current === 'registered successfully!') {
        toast({
          title: 'registered successfully!',
          description: 'You have successfully registered.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      setIsToastDisplayed(true);
    }
  }, [isAuth, isToastDisplayed, toast]);

  return (
    <VStack spacing={4} maxW="md" m="auto" p={4}>
      <Input
        isRequired
        type="text"
        placeholder="Name"
        name="name"
        value={state.name}
        onChange={handleClick}
      />
      {errors.name && <Text color="red">{errors.name}</Text>} {/* Display error message */}
      {/* <Input
        isRequired
        type="text"
        placeholder="Last Name"
        name="last"
        value={state.last}
        onChange={handleClick}
      />
      {errors.last && <Text color="red">{errors.last}</Text>} */}
      <Input
        isRequired
        type="email"
        placeholder="Email"
        name="email"
        value={state.email}
        onChange={handleClick}
      />
      {errors.email && <Text color="red">{errors.email}</Text>} {/* Display error message */}
      <Input
        isRequired
        type="password"
        placeholder="Password"
        name="password"
        value={state.password}
        onChange={handleClick}
      />
      {errors.password && <Text color="red">{errors.password}</Text>} {/* Display error message */}
      <Button
        size='lg'
        colorScheme="black"
        backgroundColor="black"
        color="white"
        pl={'20'}
        pr={'20'}
        _hover={{ backgroundColor: 'gray.700' }}
        _active={{ backgroundColor: 'gray.800' }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Sign;
