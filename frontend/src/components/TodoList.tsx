import { Box, Flex, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import TodoItem from './TodoItem';
import { useQuery } from '@tanstack/react-query';

export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:5000/api/todos');
        const data = await res.json();

        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }

        return data || [];
      } catch (error) {
        console.log(error);
      }
    },
  });

  const textColor = useColorModeValue('black', 'white');

  return (
    <>
      {!todos?.length && (
        <Text fontSize={'1xl'} textTransform={'uppercase'} fontWeight={'bold'} textAlign={'center'} mr={7} my={4} color={textColor}>
          Today's Tasks
        </Text>
      )}
      {isLoading && (
        <Flex justifyContent={'center'} my={4}>
          <Spinner size={'sm'} />
        </Flex>
      )}
      {!isLoading && todos?.length === 0 && (
        <Stack alignItems={'center'} gap='3' mt={4}>
          <Text fontSize={'md'} mr={7} textAlign={'center'} color={'gray.500'}>
            All tasks completed!
          </Text>
          <Box mr={7}>
            <img src='/frog-waiting.png' alt='Frog' width={300} height={300} />
          </Box>
        </Stack>
      )}
      <Stack gap={3} mt={4}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};
export default TodoList;
