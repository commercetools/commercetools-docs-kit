import { useAuth0 } from '@auth0/auth0-react';
import type { User } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import { useAuthToken } from '../hooks/use-auth-token';
import ConfigContext from './config-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const ProfileModalGuard = () => {
  const { isAuthenticated, user } = useAuth0();
  const { getAuthToken } = useAuthToken('user');
  const { auth0Domain } = useContext(ConfigContext);
  const { updateProfile } = useContext(LearningContext);

  useEffect(() => {
    async function fetchData() {
      const authToken = await getAuthToken();
      const getUserApiEndpoint = `https://${auth0Domain}/api/v2/users/${user?.sub}`;
      const data = await fetch(getUserApiEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = (await data.json()) as User;
      updateProfile(userData);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);
};

export default ProfileModalGuard;
