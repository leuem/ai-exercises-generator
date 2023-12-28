import { useEffect, useState } from 'react';
import {
  LEARNER_LEVEL,
  ROLE_SKILL,
  VOCABULARY_WORKSHEET_TYPE,
  WORKSHEET_SKILL,
} from '../constants/prompt';

interface IConfig {
  roleSkill: string;
  workSheetSkill: string;
  task: string;
  wordList?: string | undefined;
  learnerLevel?: string;
}

export const useGeneratePrompt = (
  skill: string,
  task: string,
  words?: string,
  learnerLevel?: string
) => {
  const [config, setConfig] = useState<IConfig>({
    roleSkill: '',
    workSheetSkill: '',
    task: '',
    wordList: '',
    learnerLevel: LEARNER_LEVEL.B1,
  });
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    if (skill === 'vocabulary') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        roleSkill: ROLE_SKILL.vocabulary,
      }));
      setConfig((prevConfig) => ({
        ...prevConfig,
        workSheetSkill: WORKSHEET_SKILL.vocabulary,
      }));
    }
    if (task === 'fillInGaps') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        task: VOCABULARY_WORKSHEET_TYPE.fillInGaps,
      }));
    }
    if (words) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        wordList: words,
      }));
    }
    if (learnerLevel) {
      const levelMapping: Record<string, string> = {
        A1: LEARNER_LEVEL.A1,
        A2: LEARNER_LEVEL.A2,
        B1: LEARNER_LEVEL.B1,
        B2: LEARNER_LEVEL.B2,
        C1: LEARNER_LEVEL.C1,
      };
      setConfig((prevConfig) => ({
        ...prevConfig,
        learnerLevel: levelMapping[learnerLevel] || prevConfig.learnerLevel,
      }));
    }
  }, [skill, task, words, learnerLevel]);

  useEffect(() => {
    setPrompt(`You are a tutor creating ${config.roleSkill}. The sentences will provide ${config.workSheetSkill}.
    ${config.task}
    ${config.wordList}
    The sentence should be appropriate for ${config.learnerLevel}.
    The learners are adults from 25 to 50 years old.
    The sentences should use casual language.
    In your reply write nothing else but the sentences.`);
  }, [config]);

  return prompt;
};
