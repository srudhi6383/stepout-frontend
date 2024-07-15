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
    const toast = useToast();
  
    useEffect(() => {
      async function getdata() {
        try {
          const result = await axios.get(`${Main_url}/train/api/userbooking`, { withCredentials: true });
          const data = result.data;
          setTrains(data);
        } catch (error) {
          console.log(error);
        }
      }
      getdata();
    }, []);
  
    const handleTrainClick = (train) => {
      setSelectedTrain(train);
      onOpen();
    };

    const handleUpdate = async() => {
      if (!selectedTrain?.train_name || !selectedTrain?.source || !selectedTrain?.destination || !selectedTrain?.seat_capacity || !selectedTrain?.arrival_time_at_source || !selectedTrain?.arrival_time_at_destination) {
        toast({
          title: 'Missing Details',
          description: 'Please fill all fields to create the train.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    try {
        console.log(selectedTrain);
        const result = await axios.put(`${Main_url}/train/api/train/${selectedTrain?.train_id}/update`,{selectedTrain},{withCredentials:true})
        const data = result.data
        console.log(data);
        toast({
            title: 'Train Updated',
            description: 'All the fields are updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
    } catch (error) {
        console.log(error)
    }

      onClose();
    };
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleCreateTrain = async () => {
      if (!selectedTrain?.train_name || !selectedTrain?.source || !selectedTrain?.destination || !selectedTrain?.seat_capacity || !selectedTrain?.arrival_time_at_source || !selectedTrain?.arrival_time_at_destination) {
        toast({
          title: 'Missing Details',
          description: 'Please fill all fields to create the train.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      try {
        const response = await axios.post(`${Main_url}/train/api/trains`, selectedTrain, { withCredentials: true });
        setTrains([...trains, response.data]);
        toast({
          title: 'Train Created',
          description: 'Train has been created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was an error creating the train.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.log(error);
      }
    };
  
    return (
      <Box>
        <Button onClick={onOpen} colorScheme="teal" mb={4}>
          Create Train
        </Button>
  
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {trains.map((train, index) => (
            <GridItem key={index} onClick={() => handleTrainClick(train)}>
              <Box p={4} border={'1px solid grey'} borderRadius="md" boxShadow="md">
                <Text fontSize="md" fontWeight="bold">
                  {train.train_name}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {train.source} → {train.destination}
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
                <Input
                  value={selectedTrain?.train_name || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, train_name: e.target.value }))}
                  placeholder="Train Name"
                />
                <Input
                  value={selectedTrain?.source || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, source: e.target.value }))}
                  placeholder="Source"
                />
                <Input
                  value={selectedTrain?.destination || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, destination: e.target.value }))}
                  placeholder="Destination"
                />
                <Input
                  value={selectedTrain?.seat_capacity || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, seat_capacity: parseInt(e.target.value) }))}
                  placeholder="Seat Capacity"
                />
                <Input
                  value={selectedTrain?.arrival_time_at_source || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, arrival_time_at_source: e.target.value }))}
                  placeholder="Arrival Time at Source"
                />
                <Input
                  value={selectedTrain?.arrival_time_at_destination || ''}
                  onChange={(e) => setSelectedTrain((prev) => ({ ...prev, arrival_time_at_destination: e.target.value }))}
                  placeholder="Arrival Time at Destination"
                />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={selectedTrain ? handleUpdate : handleCreateTrain}>
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
  