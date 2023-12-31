import {
  RadioGroup,
  HStack,
  Radio,
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  Input,
  VStack,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCompleteChatMutation } from '../store/gpt-api/gpt.api';
import { useGeneratePrompt } from '../utils/generatePrompt';
import { LEARNER_LEVEL } from '../constants/prompt';

interface IFormValues {
  skill: string;
  taskType: string;
  wordList: string;
  learnerLevel: string;
}

function ExerciseForm() {
  const [formValues, setFormValues] = useState<IFormValues>({
    skill: '',
    taskType: '',
    wordList: '',
    learnerLevel: LEARNER_LEVEL.B1,
  });
  const [parsedData, setParsedData] = useState();

  const [sendMessage, { isLoading, isSuccess, data }] = useCompleteChatMutation(
    {
      fixedCacheKey: 'shared-AI-answer',
    }
  );
  function handleSendMessage() {
    sendMessage({
      content: `Hi! It's just a test`,
    }).then((res) => {
      console.log(res);
    });
  }
  const prompt = useGeneratePrompt(
    formValues.skill,
    formValues.taskType,
    formValues.wordList,
    formValues.learnerLevel
  );

  useEffect(() => {
    console.log(prompt);
  }, [prompt, formValues]);

  useEffect(() => {
    if (isSuccess && data) {
      setParsedData(JSON.parse(data.choices[0].message.content));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (parsedData) {
      console.log(parsedData);
    }
  }, [parsedData]);

  return (
    <Card>
      <CardBody display="flex" gap={'8px'} flexDirection={'column'}>
        <Text fontSize={'lg'}>Choose the skill:</Text>
        <RadioGroup
          name="skill"
          value={formValues.skill}
          onChange={(value) => setFormValues({ ...formValues, skill: value })}
        >
          <HStack>
            <Radio value="vocabulary">Vocabulary</Radio>
            <Radio value="grammar" isDisabled>
              Grammar
            </Radio>
            <Radio value="reading" isDisabled>
              Reading
            </Radio>
          </HStack>
        </RadioGroup>
        <Text fontSize={'lg'}>Type of exercise</Text>
        <RadioGroup
          name="task-type"
          value={formValues.taskType}
          onChange={(value) =>
            setFormValues({ ...formValues, taskType: value })
          }
        >
          <HStack>
            <Radio value="fillInGaps">Fill-in-gaps</Radio>
            <Radio value="grammar" isDisabled>
              Matching with definition
            </Radio>
            <Radio value="reading" isDisabled>
              Guessing the meaning
            </Radio>
          </HStack>
        </RadioGroup>
        <VStack alignItems={'flex-start'} spacing={0}>
          <Text fontSize={'lg'}>Words to practice</Text>
          <Text fontSize={'2xs'}>type words separeted by comas</Text>
        </VStack>
        <Input
          type="text"
          colorScheme="telegram"
          onChange={(e) =>
            setFormValues({ ...formValues, wordList: e.target.value })
          }
        />
        <Text fontSize={'lg'}>Learner's level</Text>
        <Select
          defaultValue={'A1'}
          onChange={(e) =>
            setFormValues({ ...formValues, learnerLevel: e.target.value })
          }
        >
          <option value={'A1'}>Beginner A1</option>
          <option value={'A2'}>Elementary A2</option>
          <option value={'B1'}>Intermediate B1</option>
          <option value={'B2'}>Upper-Intermediate B2</option>
          <option value={'C1'}>Advanced C1</option>
        </Select>
      </CardBody>
      <CardFooter justifyContent={'center'}>
        {' '}
        <Tooltip
          hasArrow
          label="It might take 5-10 seconds"
          placement={'top'}
          display={isLoading ? 'block' : 'none'}
        >
          <Button
            variant={'outline'}
            colorScheme={'telegram'}
            onClick={() => sendMessage({ content: prompt })}
            isLoading={isLoading}
            loadingText={'Generating...'}
          >
            Generate the exericse!
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export default ExerciseForm;
