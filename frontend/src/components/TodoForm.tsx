import { Button, Flex, Input, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const [isPending, setIsPending] = useState(false);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Todo added!');
  };

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
        />
        <Button
          mx={2}
          type='submit'
          _active={{
            transform: 'scale(.97)',
          }}
        >
          {isPending ? <Spinner size={'xs'} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
