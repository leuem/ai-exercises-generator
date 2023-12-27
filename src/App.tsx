import { VStack, Text } from '@chakra-ui/react';
import { useGetUsersQuery } from './store/dummy-api/dummy.api';
import { useEffect } from 'react';

function App() {
  const { data } = useGetUsersQuery('');

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <VStack minHeight={'100vh'} justifyContent={'center'}>
      <Text>Хуй пизда мдк!</Text>
    </VStack>
  );
}

export default App;
