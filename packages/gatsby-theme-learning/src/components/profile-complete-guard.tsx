import { useAuth0 } from '@auth0/auth0-react';
import type { User } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import { useAuthToken } from '../hooks/use-auth-token';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from './config-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const ProfileModalGuard = () => {
  const { isAuthenticated, user } = useAuth0();
  const { getAuthToken } = useAuthToken();
  const { auth0Domain, features } = useContext(ConfigContext);
  const { updateProfile } = useContext(LearningContext);

  const isModalFeatureEnabeld = isFeatureEnabled(
    EFeatureFlag.CompleteProfileModal,
    features
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const authToken = await getAuthToken();
        const getUserApiEndpoint = `https://${auth0Domain}/api/v2/users/${user?.sub}`;
        const data = await fetch(getUserApiEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (data.status !== 200) {
          throw new Error(`Error fetching user profile for user ${user?.sub}`);
        }
        const userData = (await data.json()) as User;
        updateProfile(userData);
      } catch (error) {
        console.error(error);
      }
    }
    if (isModalFeatureEnabeld && isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, isModalFeatureEnabeld]);
};

export default ProfileModalGuard;
