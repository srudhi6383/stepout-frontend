import { useEffect, useState } from 'react';
import Navbar from './Pages/Navbar';
import App_routes from './Pages/App_routes';
import { Box,   useDisclosure } from '@chakra-ui/react';

function App() {
  const [rendernav, setrendernav] = useState(false);
  const { isOpen, onOpen } = useDisclosure();

  // Automatically open the message on mount
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
          bg="yellow.200"
          p={3}
          textAlign="center"
          borderBottomWidth="1px"
          borderColor="yellow.300"
          zIndex={10}
        >
          
        </Box>
      )}
      <Navbar rendernav={rendernav} />
      <App_routes rendernav={rendernav} setrendernav={setrendernav} />
    </div>
  );
}

export default App;
