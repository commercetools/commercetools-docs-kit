import { User } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { LearningContextApi, LearningContextState } from './learning-context';
import {
  AUTH0_CLAIM_COMPANY,
  AUTH0_CLAIM_GLOBAL_ACCOUNT_NAME,
  AUTH0_CLAIM_GLOBAL_ACCOUNT_ID,
} from '../../sso';
import { isProfileComplete } from './profile.utils';
import useAuthentication from '../../sso/hooks/use-authentication';
import useLocalStorageSession from '../../sso/hooks/use-local-storage-session';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const contextProfileAdapter = (auth0User: User) => {
  const {
    [AUTH0_CLAIM_COMPANY]: company,
    [AUTH0_CLAIM_GLOBAL_ACCOUNT_NAME]: global_account_name,
    [AUTH0_CLAIM_GLOBAL_ACCOUNT_ID]: global_account_id,
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
    global_account_name,
    global_account_id,
  };
};

const UserProfileInit = () => {
  useLocalStorageSession();
  const { user, isAuthenticated } = useAuthentication();
  const { updateProfile, openProfileModal, closeProfileModal } =
    useContext(LearningContextApi);
  const {
    user: { profile },
  } = useContext(LearningContextState);

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
