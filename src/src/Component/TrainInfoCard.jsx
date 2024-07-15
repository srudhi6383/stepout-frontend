import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    VStack,
    HStack,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Formats to "MM/DD/YYYY, HH:MM:SS AM/PM"
  };
  
  const TrainInfoCard = ({ train, onBookClick }) => {
    return (
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        mb={4}
        w={'400px'}
      >
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            {train.source} → {train.destination}
          </Text>
        </HStack>
        <Text fontSize="md" mt={2}>
          Train Name: {train.train_name} {/* Added train name */}
        </Text>
        <Text fontSize="md" mt={2}>
          Seat Available: {train.seat_capacity}
        </Text>
        <Text fontSize="md" mt={2}>
          Arrival Date: {formatDateTime(train.arrival_time_at_source)} {/* Formatted date */}
        </Text>
        <Text fontSize="md" mt={2}>
          Destination Arrival Date: {formatDateTime(train.arrival_time_at_destination)} {/* Formatted date */}
        </Text>
        <Button mt={2} disabled={train.seat_capacity==0?true:false} colorScheme="teal" onClick={() => onBookClick(train)}>
          Book Seats
        </Button>
      </Box>
    );
  };
  
  export default TrainInfoCard;
  