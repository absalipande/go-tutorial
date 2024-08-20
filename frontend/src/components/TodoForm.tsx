import { Button, Flex, Input, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BASE_URL } from '../App';
import toast from 'react-hot-toast';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('');

  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();

      if (!newTodo.trim()) {
        toast.error('Task description cannot be empty');
        return;
      }

      try {
        const res = await fetch(BASE_URL + `/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: newTodo }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error('Something went wrong');
        }

        setNewTodo('');
        toast.success('Task created successfully');
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input && input.focus()}
          borderColor={inputBorderColor}
          borderWidth='1px'
          placeholder='Enter a new task'
        />
        <Button
          mx={2}
          type='submit'
          _active={{
            transform: 'scale(.97)',
          }}
        >
          {isCreating ? <Spinner size={'xs'} /> : <IoMdAdd size={30} />}{' '}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
