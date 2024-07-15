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
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import TrainInfoCard from '../Component/TrainInfoCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main_url = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const tost = useToast()
    const [train_data, setTrainData] = useState([]);
    const [loading,setloading] = useState(false)
    const [searchQuery, setSearchQuery] = useState({
        from: '',
        to: '',
    });
    const [bookingloading,setbookingloading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [noOfSeats, setNoOfSeats] = useState(1);
    const navigate = useNavigate()
    const handleSearch = () => {
        setloading(true)
        async function get_train() {
            const { from, to } = searchQuery;
            const params = {};

            if (from) {
                params.source = from; // Add source to params if it exists
            }
            if (to) {
                params.destination = to; // Add destination to params if it exists
            }

            const traindata = await axios.get(`${Main_url}/train/api/trains/availability`, { params });
            const data = traindata.data;
            setTrainData(data.results);
            setloading(false)
        }
        
        get_train();
    };

    const onOpen = (train) => {
        setSelectedTrain(train);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedTrain(null);
        setNoOfSeats(1);
    };

    const handleBook = async() => {
        const auth = localStorage.getItem('Railway_auth');
        
        if(auth){
            setbookingloading(true)
            try {
                
                const data = await axios.post(`${Main_url}/train/api/trains/${selectedTrain?._id}/book`,{},{ withCredentials: true })
                const result = data.data
                tost({
                    title: 'Seat Booked.',
                    description: "you can view all details in dashboard.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  onClose();
                  setbookingloading(false)
            } catch (error) {
                tost({
                    title: 'Error.',
                    description: "Something went wrong.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
                  onClose();
                setbookingloading(false)
                console.log(error)
            }
        }
        else{
            navigate('/login')
            onClose();
        }
        
    };
    
    return (
        <Box
            bg="linear-gradient(to bottom, #f7f7f7, #e7e7e7)"
            w="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                direction="column"
                bg="white"
                p={8}
                borderRadius="md"
                boxShadow="md"
                w="lg"
            >
                <Heading as="h1" size="lg" mb={4}>
                    Book Your Train Tickets
                </Heading>
                <VStack spacing={4}>
                    <HStack spacing={4}>
                        <Box w="50%">
                            <Text fontSize="lg" mb={2}>
                                From
                            </Text>
                            <Input
                                placeholder="Enter city name"
                                size="lg"
                                variant="filled"
                                borderRadius="md"
                                value={searchQuery.from}
                                onChange={(e) =>
                                    setSearchQuery({ ...searchQuery, from: e.target.value })
                                }
                            />
                        </Box>
                        <Box w="50%">
                            <Text fontSize="lg" mb={2}>
                                To
                            </Text>
                            <Input
                                placeholder="Enter city name"
                                size="lg"
                                variant="filled"
                                borderRadius="md"
                                value={searchQuery.to}
                                onChange={(e) =>
                                    setSearchQuery({ ...searchQuery, to: e.target.value })
                                }
                            />
                        </Box>
                    </HStack>
                    <Button isLoading={loading}
                        colorScheme="teal"
                        size="lg"
                        variant="solid"
                        borderRadius="md"
                        onClick={handleSearch}
                    >
                        Search Trains
                    </Button>
                    {train_data.length > 0 && (
                        <VStack spacing={4} mt={4}>
                            {train_data.map((train, index) => (
                                <TrainInfoCard key={index} train={train} onBookClick={()=>onOpen(train)} />
                            ))}
                        </VStack>
                    )}
                </VStack>
            </Flex>

            {/* Modal for Booking Seats */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Book Seats for {selectedTrain?.source} to {selectedTrain?.destination}</ModalHeader>
                    <ModalBody>
                        <Input
                            type="number"
                            value={noOfSeats}
                            onChange={(e) => setNoOfSeats(e.target.value)}
                            placeholder="Number of Seats"
                            min={1}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={bookingloading} colorScheme="blue" onClick={handleBook}>
                            Book
                        </Button>
                        <Button variant="ghost" onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default HomePage;
