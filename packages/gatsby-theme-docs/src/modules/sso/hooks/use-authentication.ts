import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import ConfigContext from '../../../components/config-context';
import { fetcherWithToken } from '../../self-learning/hooks/hooks.utils';
import { getCookieValue } from '../utils/common.utils';

const doesSessionExist = (cookieContent?: string): boolean => {
  if (!cookieContent) {
    return false;
  }
  // Parse the JSON content of the cookie
  try {
    const parsedContent = JSON.parse(decodeURIComponent(cookieContent));
    return parsedContent?.sessionExists;
  } catch (err) {
    return false;
  }
};

const useAuthentication = () => {
  const { isAuthenticated: isAuth0Authenticated, ...rest } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [shouldInitSession, setShouldInitSession] = useState(false);

  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();

  const apiEndpoint = `/api/init-session`;

  const { data, error, isLoading } = useSWR(
    shouldInitSession ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl, 'POST'),
    {
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    const checkUserSessionCookie = () => {
      const cookieName = 'user_session_for_client';
      const cookieValue = getCookieValue(cookieName);
      if (!doesSessionExist(cookieValue)) {
        setShouldInitSession(true);
      } else {
        setIsAuthenticated(true);
      }
    };
    if (isAuth0Authenticated) {
      checkUserSessionCookie();
    }
  }, [isAuth0Authenticated]);

  useEffect(() => {
    if (!isLoading && (data || error)) {
      setShouldInitSession(false);
      // even in case of error we don't want to block the user from being considered authenticated
      setIsAuthenticated(true);
    }
  }, [isLoading, data, error]);

  // returns exacly the same properties as userAuth0
  return { ...rest, isAuthenticated };
};

export default useAuthentication;
