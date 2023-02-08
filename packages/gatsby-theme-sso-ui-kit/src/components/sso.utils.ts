export const getLogoutReturnUrl = (
  learnApiBaseUrl: string,
  currentLocation: Location
) => {
  const host = learnApiBaseUrl || currentLocation.origin;
  return `${host}/api/logout?redirect=${encodeURIComponent(
    currentLocation.href
  )}`;
};

/**
 * Naive approach disclaimer: looking for better ideas.
 * If `displayName` contains multiple space separated words, I assume the first 2 are first and last name
 * If `displayName` property contains just a single string(maybe email, maybe just firstname),
 * simply return the first 2 letters.
 */
export const getAvatarInitials = (displayName: string): string[] => {
  if (!displayName) {
    return ['', ''];
  }
  const words = displayName.toLowerCase().split(' ');
  if (words.length === 1 && words[0].length === 1) {
    const singleLetterName = words[0].charAt(0);
    return [singleLetterName, singleLetterName];
  }
  return words.length > 1
    ? [words[0].charAt(0), words[1].charAt(0)]
    : [words[0].charAt(0), words[0].charAt(1)];
};
