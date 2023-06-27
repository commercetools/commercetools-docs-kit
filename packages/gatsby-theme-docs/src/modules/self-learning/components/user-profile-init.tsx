import { User } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import { AUTH0_CLAIM_COMPANY } from '../../sso';
import { isProfileComplete } from './profile.utils';
import useAuthentication from '../../sso/hooks/use-authentication';

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
  const { user, isAuthenticated } = useAuthentication();
  const {
    updateProfile,
    user: { profile },
    openProfileModal,
    closeProfileModal,
  } = useContext(LearningContext);

  useEffect(() => {
    if (isAuthenticated && !profile && user) {
      updateProfile(contextProfileAdapter(user));
    }
  }, [isAuthenticated, profile, user, updateProfile]);

  // checks if the profile is complete and forces the update profile
  // modal to be open in case it's incomplete
  useEffect(() => {
    if (profile && !isProfileComplete(profile)) {
      openProfileModal({
        title: 'Tell us a bit about yourself.',
        isDismissable: false,
      });
    }
    if (profile && isProfileComplete(profile)) {
      closeProfileModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
};

export default UserProfileInit;
