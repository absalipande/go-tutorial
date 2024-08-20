import { Badge, Box, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Todo } from './TodoList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../App';
import toast from 'react-hot-toast';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: async () => {
      if (todo.completed) {
        toast.success('Task is already completed');
        return null;
      }

      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: 'PATCH',
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        return data;
      } catch (error) {
        toast.error('Failed to update Todo');
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        toast.success('Task updated successfully!');
      }
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async () => {
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        toast.success('Task deleted successfully');
        return data;
      } catch (error) {
        toast.error('Failed to delete task');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error('An error occurred while deleting the task');
    },
  });

  // define color values based on the color mode
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue(todo.completed ? 'green.700' : 'gray.900', todo.completed ? 'green.200' : 'yellow.300');
  const doneBadgeColor = 'green';
  const inProgressBadgeColor = 'yellow';

  return (
    <Flex gap={2} alignItems={'center'}>
      <Flex flex={1} alignItems={'center'} border={'1px'} borderColor={borderColor} p={2} borderRadius={'lg'} justifyContent={'space-between'}>
        <Text color={textColor} textDecoration={todo.completed ? 'line-through' : 'none'}>
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
        <Box color={'green.500'} cursor={'pointer'} onClick={() => updateTodo()}>
          {!isUpdating && <FaCheckCircle size={20} />}
          {isUpdating && <Spinner size={'sm'} />}
        </Box>
        <Box color={'red.500'} cursor={'pointer'} onClick={() => deleteTodo()}>
          {!isDeleting && <MdDelete size={25} />}
          {isDeleting && <Spinner size={'sm'} />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
