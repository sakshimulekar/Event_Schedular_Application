import React from "react";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authReducer/action";
import Cookies from "js-cookie";
const Navbar = () => {
    const dispatch = useDispatch()
    const handleLogout=()=>{
        dispatch(logout)
    }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingX={4}
      paddingY={2}
      bg="blue.500"
      color="white"
      boxShadow="md"
      zIndex={10}
      position="sticky"
      top={0}
      mb={10}
      bgGradient={[
        'linear(to-tr, teal.300, yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}
    >
      {/* Centered Event Scheduler Heading */}
      <Link to={'/'}>
      <Text fontSize="xl" fontWeight="bold" textAlign={'center'} pl={30} color={"black"}>
        Event Scheduler
      </Text>
      </Link>

      {/* Right Side - User Profile and Logout Icons */}
      <Flex align="center" pl={30}>
        {/* User Profile Icon */}
        <Link to={'/signUp'}>
            <IconButton
            aria-label="User Profile"
            icon={<FiUser />}
            fontSize="lg"
            marginRight={4}
            variant="ghost"
            _hover={{ color: "#FF0080" }}
            />
        </Link>
        {/* Logout Icon */}
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          fontSize="lg"
          variant="ghost"
          onClick={handleLogout}
          _hover={{ color: "#FF0080" }}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
