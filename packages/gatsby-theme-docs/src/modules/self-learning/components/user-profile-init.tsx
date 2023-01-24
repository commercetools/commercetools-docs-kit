import { User, useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import { AUTH0_CLAIM_COMPANY } from '../../sso';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const contextProfileAdapter = (auth0User: User) => {
  const {
    [AUTH0_CLAIM_COMPANY]: company,
    user_metadata,
    sub,
    ...rest
  } = auth0User;

  return {
    ...rest,
    user_id: sub,
    user_metadata: {
      ...user_metadata,
      company,
    },
  };
};

const UserProfileInit = () => {
  const { user, isAuthenticated } = useAuth0();
  const {
    updateProfile,
    user: { profile },
  } = useContext(LearningContext);

  useEffect(() => {
    if (isAuthenticated && !profile && user) {
      updateProfile(contextProfileAdapter(user));
    }
  }, [isAuthenticated, profile, user, updateProfile]);
};

export default UserProfileInit;