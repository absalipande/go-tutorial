import { Box, Flex, Button, useColorModeValue, useColorMode, Text, Container } from '@chakra-ui/react';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('white', '#1a202c');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Container maxW={'900px'}>
      <Box bg={bgColor} px={4} my={4} borderRadius={'5'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} flexGrow={1} justifyContent={'center'}>
            <Text fontSize={'2xl'} fontWeight={700} color={textColor} mr={1}>
              Daily Tasks
            </Text>
            <Button
              onClick={toggleColorMode}
              bg='transparent'
              color={textColor}
              _hover={{ bg: useColorModeValue('gray.100', '#2d3748') }}
              _active={{ bg: useColorModeValue('gray.200', '#4a5568') }}
              p={1}
            >
              {colorMode === 'light' ? <IoMoon size={20} /> : <LuSun size={20} />}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
