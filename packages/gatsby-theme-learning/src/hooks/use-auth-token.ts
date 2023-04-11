import { useContext, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ConfigContext from '../components/config-context';

const getScopeByMode = (mode?: string) => {
  switch (mode) {
    case 'user':
      return { scope: 'read:users read:current_user read:user_idp_tokens' };
    default:
      return {};
  }
};

export const useAuthToken = (mode?: string) => {
  const { auth0Domain } = useContext(ConfigContext);
  const { getAccessTokenSilently } = useAuth0();
  const audience =
    auth0Domain === 'auth.id.commercetools.com'
      ? 'commercetools.eu.auth0.com'
      : auth0Domain;
  const scope = getScopeByMode(mode);
  const getAuthToken = useCallback(async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${audience}/api/v2/`,
        ...scope,
      },
    });
  }, [audience, getAccessTokenSilently, scope]);

  return {
    getAuthToken,
  };
};
