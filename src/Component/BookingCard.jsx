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


const BookingCard = ({ booking }) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };
  
    return (
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={5}
        borderRadius="md"
        boxShadow="lg"
        mb={4}
        borderWidth={1}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        transition="0.2s"
        _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
      >
        <HStack justify="space-between" mb={3}>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            {booking.train_name}
          </Text>
          <Text fontSize="md" color="gray.600">
            {formatDate(booking.arrival_time_at_source)} - {formatDate(booking.arrival_time_at_destination)}
          </Text>
        </HStack>
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="md" fontWeight="semibold">
            Seat Numbers:
          </Text>
          <HStack spacing={1}>
            {booking.seat_numbers.map((seat) => (
              <Badge key={seat} colorScheme="teal">
                {seat}
              </Badge>
            ))}
          </HStack>
        </VStack>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Booking Date: {formatDate(booking.booking_date)}
        </Text>
      </Box>
    );
  };

  export default BookingCard