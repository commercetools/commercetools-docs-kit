import { useContext } from 'react';
import { LearningContextState } from './learning-context';

const FirstName = () => {
  const { user } = useContext(LearningContextState);
  return user?.profile?.given_name || '';
};

export default FirstName;
