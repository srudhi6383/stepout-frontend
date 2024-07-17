import { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage';
import Navbar from './Pages/Navbar';
import LoginSignupPage from './Pages/Login';
import App_routes from './Pages/App_routes';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';

function App() {
  const [rendernav, setrendernav] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
       {isOpen && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bg="ylue.200"
          p={3}
          textAlign="center"
          borderBottomWidth="1px"
          borderColor="blue.300"
          zIndex={10}
        >
          <Text fontSize="md">
                   Thanks
          </Text>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={onClose}
            ml={4}
          >
            Back
          </Button>
        </Box>
      )}
      <Navbar rendernav={rendernav} />
      <App_routes rendernav={rendernav} setrendernav={setrendernav} />
    </div>
  );
}

export default App;