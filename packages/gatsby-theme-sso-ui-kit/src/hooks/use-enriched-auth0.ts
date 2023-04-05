import { useAuth0 } from '@auth0/auth0-react';
import type { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-react';

const useEnrichedAuth0 = () => {
  const { logout, loginWithRedirect, ...rest } = useAuth0();

  const cleanCacheAndLogout = (options: LogoutOptions | undefined) => {
    localStorage?.removeItem('app-cache');
    logout(options);
  };

  const cleanCacheAndLogin = (options: RedirectLoginOptions | undefined) => {
    localStorage?.removeItem('app-cache');
    loginWithRedirect(options);
  };

  return {
    ...rest,
    logout: cleanCacheAndLogout,
    loginWithRedirect: cleanCacheAndLogin,
  };
};

export default useEnrichedAuth0;
