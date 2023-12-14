import { useContext } from 'react';
import ConfigContext from '../components/config-context';
import UserProfile from '../modules/sso/components/avatar';
import { AuthenticatedContextState } from '../components/authenticated-context';
const LoginInfo = () => {
  const { hideLogin } = useContext(ConfigContext);
  const {
    user: { profile },
  } = useContext(AuthenticatedContextState);

  return hideLogin && !profile ? null : <UserProfile />;
};

export default LoginInfo;
