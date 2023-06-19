import { User } from '@auth0/auth0-react';
import { AUTH0_CLAIM_DISPLAYNAME } from '../sso.const';

export const getLogoutReturnUrl = (
  learnApiBaseUrl: string,
  currentLocation: Location
) => {
  const host = learnApiBaseUrl || currentLocation.origin;
  return `${host}/api/logout?redirect=${encodeURIComponent(
    currentLocation.href
  )}`;
};

const existsNotEmpty = (property: string | undefined) =>
  property && property.trim() !== '';

/**
 * Given a user auth0 profile, it extract the user initials in form of string[]
 */
export const getAvatarInitials = (profile: User): string[] => {
  // ideal case: we've got values for first and last name
  if (
    existsNotEmpty(profile?.given_name) &&
    existsNotEmpty(profile?.family_name)
  ) {
    return [
      (profile.given_name as string).toLowerCase().charAt(0),
      (profile.family_name as string).toLowerCase().charAt(0),
    ];
  }
  // fallback 1: let's check name (either profile.name or custom claim display_name)
  // If `displayName` contains multiple space separated words, I assume the first 2 are first and last name
  // If `displayName` property contains just a single string(maybe email, maybe just firstname),
  // simply return the first 2 letters.
  if (
    existsNotEmpty(profile?.name) ||
    existsNotEmpty(profile?.[AUTH0_CLAIM_DISPLAYNAME])
  ) {
    const displayName: string =
      profile?.name || profile?.[AUTH0_CLAIM_DISPLAYNAME];
    const words = displayName.toLowerCase().split(' ');
    if (words.length === 1 && words[0].length === 1) {
      const singleLetterName = words[0].charAt(0);
      return [singleLetterName, singleLetterName];
    }
    return words.length > 1
      ? [words[0].charAt(0), words[1].charAt(0)]
      : [words[0].charAt(0), words[0].charAt(1)];
  }
  // fallback 2: use email
  if (existsNotEmpty(profile?.email)) {
    return [
      (profile.email as string).charAt(0),
      (profile.email as string).charAt(1),
    ];
  }
  // fallback 3: just return empty initials
  return ['', ''];
};
