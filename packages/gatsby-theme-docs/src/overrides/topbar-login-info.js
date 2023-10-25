import { useContext } from 'react';
import ConfigContext from '../components/config-context';
import UserProfile from '../modules/sso/components/avatar';
import { LearningContextState } from '../modules/self-learning/components/learning-context';
const LoginInfo = () => {
  const { hideLogin } = useContext(ConfigContext);
  const {
    user: { profile },
  } = useContext(LearningContextState);

  return hideLogin && !profile ? null : <UserProfile />;
};

export default LoginInfo;
