import { Stack } from '@chakra-ui/react';
import Navbar from './components/Navbar';

export const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api';

function App() {
  return (
    <Stack h='100vh'>
      <Navbar />
    </Stack>
  );
}

export default App;
