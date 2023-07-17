import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import ConfigContext from '../../../components/config-context';
import { fetcherWithToken } from '../../self-learning/hooks/hooks.utils';
import { getCookieValue } from '../utils/common.utils';

export const LOCAL_STORAGE_SESSION = 'user_session';

// 1. in case a session item doesn't exist and userId is defined. We create a new session item
// 2. in case a session item exist but it doesn't match the userId. We replace the session item with the
// new userId
const saveLocalStorageSession = (userId?: string) => {
  const savedSession = localStorage.getItem(LOCAL_STORAGE_SESSION);
  if (
    (!savedSession && userId) ||
    (savedSession && userId && savedSession !== userId)
  ) {
    localStorage.setItem(LOCAL_STORAGE_SESSION, userId);
  }
};

// Deletes the local storage session ONLY if it exists, this will reduce the number
// of storage events
const deleteLocalStorageSession = () => {
  const savedSession = localStorage.getItem(LOCAL_STORAGE_SESSION);
  if (savedSession) {
    localStorage.removeItem(LOCAL_STORAGE_SESSION);
  }
};

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

  // handles the creation/deletion of the user_session flag in local storage
  useEffect(() => {
    if (!rest.isLoading) {
      // don't consider transition states
      if (isAuth0Authenticated) {
        saveLocalStorageSession(rest.user?.sub);
      } else {
        deleteLocalStorageSession();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth0Authenticated, rest.isLoading]);

  // returns exacly the same properties as userAuth0
  // in addition we return isAuth0Authenticated as reference to the original
  // authenticated state which can be safely used in components that don't
  // interact with the learning API.
  return { ...rest, isAuthenticated, isAuth0Authenticated };
};

export default useAuthentication;
