import { VStack, Spinner } from '@chakra-ui/react';
import { useCompleteChatMutation } from './store/gpt-api/gpt.api';
import ExerciseForm from './components/ExerciseForm';
import './index.css';
import { useEffect, useState } from 'react';
import { SentenceInput } from './components/SentenceInput';
import { sampleData } from './store/answer-sample';
import { shuffleArray } from './utils/shuffleArray';
import { ExerciseSentenceInput } from './components/ExerciseSentenceInput';
import { ISentence } from './interfaces/sentence-with-input';
import { sampleData2 } from './store/answer-sample2';

function App() {
  const [sendMessage, { isSuccess, isLoading, data }] = useCompleteChatMutation(
    { fixedCacheKey: 'shared-AI-answer' }
  );
  const [parsedData, setParsedData] = useState<ISentence[]>([
    {
      sentence: '',
      answer: '',
    },
  ]);

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

  useEffect(() => {
    if (isSuccess && data) {
      setParsedData(JSON.parse(data.choices[0].message.content));
    }
  }, [isSuccess]);

  return (
    <VStack minHeight={'100vh'} m={'0 auto'} maxW={'800px'}>
      <ExerciseForm />
      {isSuccess && data && parsedData ? (
        <ExerciseSentenceInput sentenceList={parsedData} />
      ) : null}
      <ExerciseSentenceInput sentenceList={sampleData2} />
    </VStack>
  );
}

export default App;
