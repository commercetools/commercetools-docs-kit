import { User } from '@auth0/auth0-react';

export const isProfileComplete = (userData: User): boolean =>
  userData.given_name &&
  userData.given_name !== '' &&
  userData.family_name &&
  userData.family_name !== '' &&
  userData?.user_metadata?.company &&
  userData.user_metadata.company !== '';
