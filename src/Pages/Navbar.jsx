// Navbar.js
import {
  Box,
  Flex,
  Link,
  Button,
  Text,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NavLink, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Main_url = import.meta.env.VITE_API_URL;
const Navbar = ({ rendernav }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('Railway_auth');
    setIsLoggedIn(!!auth);
  }, [rendernav]);

  const handleLogout = async () => {
    try {
      const result = await axios.post(`${Main_url}/user/api/logout`, {}, { withCredentials: true });
      localStorage.removeItem('Railway_auth');
      <NavLink to='/login'/>
      window.location.reload()
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box
      as="nav"
      bg={bg}
      borderBottomWidth="1px"
      borderColor={borderColor}
      py={4}
      px={8}
      position={'sticky'}
      top={0}
      zIndex={4}
    >
      <Flex align="center" justify="space-between">
        <RouterLink to="/" _hover={{ textDecoration: 'none' }}>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            Train Booking
          </Text>
        </RouterLink>
        <Spacer />
        <Flex gap={'10px'} align="center">
          <RouterLink to='/'>
            <Text fontSize="md" color="gray.600">
              Home
            </Text>
          </RouterLink>
          <RouterLink to='/login'>
            <Text fontSize="md" color="gray.600">
              Login
            </Text>
          </RouterLink>
          <RouterLink to='/profile'>
            <Text fontSize="md" color="gray.600">
              Profile
            </Text>
          </RouterLink>
        </Flex>
        {isLoggedIn ? (
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            ml={4}
            borderRadius="md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            ml={4}
            borderRadius="md"
            onClick={()=>navigate('/login')}
          >
            Signup/Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
