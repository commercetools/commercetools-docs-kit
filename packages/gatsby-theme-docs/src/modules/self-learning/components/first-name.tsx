import { useContext } from 'react';
import { AuthenticatedContextState } from '../../../components/authenticated-context';

const FirstName = () => {
  const { user } = useContext(AuthenticatedContextState);
  return user?.profile?.given_name || '';
};

export default FirstName;
