// DashboardPage.js
import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Spacer,
    useColorModeValue,
    Badge,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BookingCard from '../Component/BookingCard';
const Main_url = import.meta.env.VITE_API_URL;


  const DashboardPage = () => {
    const [data,setdata] = useState([])
    useEffect(()=>{
      async function getdata(){
        try {
          const result = await axios.get(`${Main_url}/train/api/userbooking`,{ withCredentials: true })
          const data = result.data
          setdata(data)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      getdata()
    },[])
    const username = 'Welcome';
    const bookings = [
      {
        fromStation: 'New York',
        toStation: 'Los Angeles',
        arrivalTime: '10:00 AM',
        destinationArrivalTime: '1:00 PM',
        seatInfo: 'Aisle Seat, 12C',
      },
      {
        fromStation: 'Chicago',
        toStation: 'San Francisco',
        arrivalTime: '8:00 AM',
        destinationArrivalTime: '11:00 AM',
        seatInfo: 'Window Seat, 23A',
      },
      {
        fromStation: 'Miami',
        toStation: 'Boston',
        arrivalTime: '2:00 PM',
        destinationArrivalTime: '5:00 PM',
        seatInfo: 'Middle Seat, 17B',
      },
    ];
  
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        h="100vh"
        p={8}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h1" size="lg">
            Dashboard
          </Heading>
          <Text fontSize="md" fontWeight="bold">
            {username}
          </Text>
        </Flex>
        <VStack   spacing={4}>
          {data.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </VStack>
      </Box>
    );
  };
  
  export default DashboardPage;