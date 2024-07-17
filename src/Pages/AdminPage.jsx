import {
  Box,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Main_url = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trains, setTrains] = useState([]);
  const [createTrain, setCreateTrain] = useState({
    train_name: '',
    source: '',
    destination: '',
    seat_capacity: '',
    arrival_time_at_source: '',
    arrival_time_at_destination: '',
  });
  const toast = useToast();
  const [handlerender, sethandlerender] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getdata() {
      try {
        const result = await axios.get(`${Main_url}/train/api/trains/availability`, { withCredentials: true });
        const data = result.data.results;
        setTrains(data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  }, [handlerender]);

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
    setCreateTrain({
      train_name: train.train_name,
      source: train.source,
      destination: train.destination,
      seat_capacity: train.seat_capacity,
      arrival_time_at_source: train.arrival_time_at_source,
      arrival_time_at_destination: train.arrival_time_at_destination,
    });
    onOpen();
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleUpdate = async () => {
    if (!selectedTrain?.train_name || !selectedTrain?.source || !selectedTrain?.destination || !selectedTrain?.seat_capacity || !selectedTrain?.arrival_time_at_source || !selectedTrain?.arrival_time_at_destination) {
      toast({
        title: 'Missing Details',
        description: 'Please fill all fields to update the train.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const result = await axios.put(`${Main_url}/train/api/train/${selectedTrain?._id}/update`, {
        arrival_time_at_destination: formatDateTime(selectedTrain.arrival_time_at_destination),
        arrival_time_at_source: formatDateTime(selectedTrain.arrival_time_at_source),
        destination: selectedTrain.destination,
        seat_capacity: selectedTrain.seat_capacity,
        source: selectedTrain.source,
        train_name: selectedTrain.train_name,
      }, { withCredentials: true });

      toast({
        title: 'Train Updated',
        description: 'All the fields are updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      sethandlerender(!handlerender);
      setSelectedTrain(null);
      setCreateTrain({
        train_name: '',
        source: '',
        destination: '',
        seat_capacity: '',
        arrival_time_at_source: '',
        arrival_time_at_destination: '',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'No updates are reflected.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreateTrain = async () => {
    if (!createTrain.train_name || !createTrain.source || !createTrain.destination || !createTrain.seat_capacity || !createTrain.arrival_time_at_source || !createTrain.arrival_time_at_destination) {
      toast({
        title: 'Missing Details',
        description: 'Please fill all fields to create the train.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${Main_url}/train/api/trains/create`, {
        ...createTrain,
        arrival_time_at_destination: formatDateTime(createTrain.arrival_time_at_destination),
        arrival_time_at_source: formatDateTime(createTrain.arrival_time_at_source),
      }, { withCredentials: true });

     
      toast({
        title: 'Train Created',
        description: 'Train has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      sethandlerender(!handlerender)
      onClose();
      setCreateTrain({
        train_name: '',
        source: '',
        destination: '',
        seat_capacity: '',
        arrival_time_at_source: '',
        arrival_time_at_destination: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error creating the train.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        Create Train
      </Button>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {trains.map((train, index) => (
          <GridItem key={index} onClick={() => handleTrainClick(train)}>
            <Box
              p={4}
              border={'1px solid grey'}
              borderRadius="md"
              boxShadow="md"
              _hover={{ cursor: 'pointer', bg: 'gray.100' }}
            >
              <Text fontSize="md" fontWeight="bold">
                {train.train_name}
              </Text>
              <Text fontSize="md" color="gray.600">
                Source: {train.source} → Destination: {train.destination}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Arrival at Source: {new Date(train.arrival_time_at_source).toLocaleString()}<br />
                Arrival at Destination: {new Date(train.arrival_time_at_destination).toLocaleString()}<br />
                Seat Capacity: {train.seat_capacity}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTrain ? 'Edit Train' : 'Create Train'}</ModalHeader>
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Box>
                <Text fontWeight="bold">Train Name</Text>
                <Input
                  value={selectedTrain ? selectedTrain.train_name : createTrain.train_name}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, train_name: e.target.value })) : setCreateTrain((prev) => ({ ...prev, train_name: e.target.value }))}
                  placeholder="Enter train name"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Source</Text>
                <Input
                  value={selectedTrain ? selectedTrain.source : createTrain.source}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, source: e.target.value })) : setCreateTrain((prev) => ({ ...prev, source: e.target.value }))}
                  placeholder="Enter source"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Destination</Text>
                <Input
                  value={selectedTrain ? selectedTrain.destination : createTrain.destination}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, destination: e.target.value })) : setCreateTrain((prev) => ({ ...prev, destination: e.target.value }))}
                  placeholder="Enter destination"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Seat Capacity</Text>
                <Input
                  type="number"
                  value={selectedTrain ? selectedTrain.seat_capacity : createTrain.seat_capacity}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, seat_capacity: parseInt(e.target.value) })) : setCreateTrain((prev) => ({ ...prev, seat_capacity: parseInt(e.target.value) }))}
                  placeholder="Enter seat capacity"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Arrival Time at Source</Text>
                <Input
                  type="date"
                  value={selectedTrain ? selectedTrain.arrival_time_at_source.split('T')[0] : createTrain.arrival_time_at_source.split('T')[0]}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, arrival_time_at_source: e.target.value + 'T00:00:00.000Z' })) : setCreateTrain((prev) => ({ ...prev, arrival_time_at_source: e.target.value + 'T00:00:00.000Z' }))}
                  placeholder="Select arrival time at source"
                />
              </Box>
              <Box>
                <Text fontWeight="bold">Arrival Time at Destination</Text>
                <Input
                  type="date"
                  value={selectedTrain ? selectedTrain.arrival_time_at_destination.split('T')[0] : createTrain.arrival_time_at_destination.split('T')[0]}
                  onChange={(e) => selectedTrain ? setSelectedTrain((prev) => ({ ...prev, arrival_time_at_destination: e.target.value + 'T00:00:00.000Z' })) : setCreateTrain((prev) => ({ ...prev, arrival_time_at_destination: e.target.value + 'T00:00:00.000Z' }))}
                  placeholder="Select arrival time at destination"
                />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} colorScheme="blue" mr={3} onClick={selectedTrain ? handleUpdate : handleCreateTrain}>
              {selectedTrain ? 'Update' : 'Create'}
            </Button>
            <Button colorScheme="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPage;