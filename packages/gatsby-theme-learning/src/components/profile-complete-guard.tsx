import { useAuth0 } from '@auth0/auth0-react';
import type { User } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { EProfileState, LearningContext } from './learning-context';
import { useAuthToken } from '../hooks/use-auth-token';
import ConfigContext from './config-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const isProfileComplete = (userData: User): boolean =>
  userData.given_name &&
  userData.given_name !== '' &&
  userData.family_name &&
  userData.family_name !== '' &&
  userData?.user_metadata?.company &&
  userData.user_metadata.company !== '';

const ProfileModalGuard = () => {
  const { isAuthenticated, user } = useAuth0();
  const { getAuthToken } = useAuthToken('user');
  const { auth0Domain } = useContext(ConfigContext);
  const { updateProfileState } = useContext(LearningContext);

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
      const userData = await data.json();
      if (!isProfileComplete(userData)) {
        updateProfileState(EProfileState.INCOMPLETE);
      } else {
        updateProfileState(EProfileState.COMPLETE);
      }
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);
};

export default ProfileModalGuard;
