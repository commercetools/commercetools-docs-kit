import { useContext } from 'react';
import { LearningContext } from './learning-context';

const FirstName = () => {
  const { user } = useContext(LearningContext);
  return user?.profile?.given_name || '';
};

export default FirstName;
