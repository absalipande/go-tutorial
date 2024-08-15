import { Badge, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const TodoItem = ({ todo }: { todo: any }) => {
  // Define color values based on the color mode
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue(
    todo.completed ? 'green.700' : 'yellow.600', 
    todo.completed ? 'green.200' : 'yellow.300' 
  );
  const doneBadgeColor = 'green';
  const inProgressBadgeColor = 'yellow';

  return (
    <Flex gap={2} alignItems={'center'}>
      <Flex
        flex={1}
        alignItems={'center'}
        border={'1px'}
        borderColor={borderColor} 
        p={2}
        borderRadius={'lg'}
        justifyContent={'space-between'}
      >
        <Text
          color={textColor} 
          textDecoration={todo.completed ? 'line-through' : 'none'}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml='1' colorScheme={doneBadgeColor}>
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml='1' colorScheme={inProgressBadgeColor}>
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Box color={'green.500'} cursor={'pointer'}>
          <FaCheckCircle size={20} />
        </Box>
        <Box color={'red.500'} cursor={'pointer'}>
          <MdDelete size={25} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
