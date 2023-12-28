import {
  VStack,
  Button,
  CardBody,
  Card,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useCompleteChatMutation } from './store/gpt-api/gpt.api';
import ExerciseForm from './components/ExerciseForm';
import './index.css';
import { useEffect } from 'react';

function App() {
  const [sendMessage, { isSuccess, isLoading, data }] = useCompleteChatMutation(
    { fixedCacheKey: 'shared-AI-answer' }
  );

  function handleSendMessage() {
    sendMessage({
      content: `You are a tutor creating a vocabulary worksheet. The sentences will provide vocabulary practice.
    Compose sentences to practice the following words and phrases:
    exhausted, pleased, furious, stressed, upset, guilty, in a good mood, a bit down, pleasantly surprised, fed up
    The sentence should be appropriate for the intermediate B1 level.
    The learners are adults from 25 to 50 years old.
    The sentences should use casual language.
    In your reply write nothing else but the sentence.`,
    }).then((res) => {
      console.log(res);
    });
  }

  // useEffect(() => {
  //   console.log(isLoading);
  //   console.log(isSuccess);
  //   console.log(data);
  // }, [isLoading, isSuccess, data]);

  return (
    <VStack
      minHeight={'100vh'}
      justifyContent={'center'}
      maxW={'80%'}
      m={'0 auto'}
    >
      <Button
        variant={'outline'}
        colorScheme={'telegram'}
        onClick={handleSendMessage}
      >
        Generate the exericse!
      </Button>
      <Button variant={'solid'} size={'lg'}>
        Click me!
      </Button>
      <ExerciseForm />
      {isLoading ? <Spinner /> : null}
      {isSuccess ? (
        <Card>
          <CardBody>
            <Text>{data?.choices[0].message.content}</Text>
          </CardBody>
        </Card>
      ) : null}
    </VStack>
  );
}

export default App;
