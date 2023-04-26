// A React component to be rendered in the top bar next to the top menu toggle button
import { useContext } from 'react';
import ConfigContext from '../../../components/config-context';
import UserProfile from '../../../components/avatar';

const LoginInfo = () => {
  const { hideLogin } = useContext(ConfigContext);
  return hideLogin ? null : <UserProfile />;
};

export default LoginInfo;
