import { useContext, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ConfigContext from '../../../components/config-context';

export const useAuthToken = () => {
  const { auth0Domain } = useContext(ConfigContext);
  const { getAccessTokenSilently } = useAuth0();
  const audience =
    auth0Domain === 'auth.id.commercetools.com'
      ? 'commercetools.eu.auth0.com'
      : auth0Domain;
  const getAuthToken = useCallback(async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${audience}/api/v2/`,
      },
    });
  }, [audience, getAccessTokenSilently]);

  return {
    getAuthToken,
  };
};
