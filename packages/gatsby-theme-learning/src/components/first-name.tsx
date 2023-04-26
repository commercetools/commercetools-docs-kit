import { useContext } from 'react';
import { LearningContext } from './learning-context';

const FirstName = () => {
  const { user } = useContext(LearningContext);
  if (user.profile) {
    return user.profile.given_name || '';
  }
  return '';
};

export default FirstName;
