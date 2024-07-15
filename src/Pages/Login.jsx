import {
    Box,
    Flex,
    Heading,
    Text,
    Input,
    Button,
    Link,
    VStack,
    HStack,
    Spacer,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import axios from 'axios';
  import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
  
  const Main_url = import.meta.env.VITE_API_URL;
  
  const LoginSignupPage = ({rendernav,setrendernav}) => {
    const tost = useToast()
    const [isLogin, setIsLogin] = useState(true);
    const [loginInfo, setLoginInfo] = useState({
      username: '',
      email:'',
      password: '',
      confirmPassword: '', // Added for signup
    });
    const navigate = useNavigate();
    const [loading,setloading] = useState(false)
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
  
    const handleSignup = async() => {
      // Handle signup logic here
      if(!loginInfo.username || !loginInfo.password || !loginInfo.confirmPassword || !(loginInfo.password===loginInfo.confirmPassword)){
        alert('Please Provied all details')
        return
      }
      setloading(true)
      try {
        const signchk = await axios.post(`${Main_url}/user/api/signup`,{
            username:loginInfo.username,
            password:loginInfo.password,
            email:loginInfo.email
          },{
            withCredentials: true
          })
          const result = signchk.data
          setloading(false)
          tost({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          if(result.status){
           setIsLogin(true)
           
          }

          
        
      } catch (error) {
        setloading(false)
        console.log(error)
      }
    };
  
    const handleLogin = async() => {
      // Handle login logic here
      if(!loginInfo.username || !loginInfo.password){
        alert('Please Provied all details')
        return
      }
      setloading(true)
      try {
        const checklogin = await axios.post(`${Main_url}/user/api/login`,{
            username:loginInfo.username,
            password:loginInfo.password
          },{
            withCredentials: true
          })
          const result = checklogin.data
          setloading(false)
          tost({
            title: 'Login successfull.',
            description: "You are logged in.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          if(loginInfo.username=='Admin'&&loginInfo.password=='Admin'){
            localStorage.setItem('Railway_auth',true)
            navigate('/admin')
            setrendernav(!rendernav)
          }
          else if(result.status){
            localStorage.setItem('Railway_auth',true)
            navigate('/')
            setrendernav(!rendernav)
          }

          
        
      } catch (error) {
        setloading(false)
        console.log(error)
      }
    };
  
    return (
      <Box
        bg={bg}
        p={8}
        borderRadius="md"
        boxShadow="md"
        w="lg"
        mx="auto"
        mt={20}
      >
        <Flex direction="column" align="center">
          <Heading as="h1" size="lg" mb={4}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Heading>
          <Text fontSize="md" mb={8}>
            {isLogin
              ? 'Enter your credentials to login'
              : 'Create an account to get started'}
          </Text>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              size="lg"
              variant="filled"
              borderRadius="md"
              value={loginInfo.username}
              onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
            />
            {!isLogin && (
              <Input
                placeholder="Email"
                size="lg"
                variant="filled"
                borderRadius="md"
                type="text"
                value={loginInfo.email}
                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
              />
             
              
            )}
            <Input
              placeholder={isLogin ? 'Password' : 'Password (min 8 characters)'}
              size="lg"
              variant="filled"
              borderRadius="md"
              type="password"
              value={loginInfo.password}
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
            />
            {!isLogin && (
              <Input
                placeholder="Re-enter Password"
                size="lg"
                variant="filled"
                borderRadius="md"
                type="password"
                value={loginInfo.confirmPassword}
                onChange={(e) => setLoginInfo({ ...loginInfo, confirmPassword: e.target.value })}
              />
             
              
            )}
            {isLogin ? (
              <Button
                colorScheme="teal"
                size="lg"
                variant="solid"
                borderRadius="md"
                onClick={handleLogin}
                isLoading={loading}
              >
                Login
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                size="lg"
                variant="solid"
                borderRadius="md"
                onClick={handleSignup}
                isLoading={loading}
              >
                Sign Up
              </Button>
            )}
          </VStack>
          <HStack mt={4} justify="space-between">
            <Text fontSize="md">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Link
              onClick={() => {
                setIsLogin(!isLogin)
                setLoginInfo({
                    username: '',
                    email:'',
                    password: '',
                    confirmPassword: '', // Added for signup
                  })
              }}
              fontSize="md"
              color="teal.500"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Link>
          </HStack>
        </Flex>
      </Box>
    );
  };
  
  export default LoginSignupPage;
  