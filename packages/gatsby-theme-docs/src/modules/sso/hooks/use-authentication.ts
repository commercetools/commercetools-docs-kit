import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import { fetcherWithToken } from '../../self-learning/hooks/hooks.utils';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';

const useAuthentication = () => {
  const { isAuthenticated: isAuth0Authenticated, ...rest } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { learnApiBaseUrl, selfLearningFeatures } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();

  const shouldFetchData =
    isFeatureEnabled(EFeatureFlag.CourseStatus, selfLearningFeatures) &&
    isAuth0Authenticated;

  const apiEndpoint = `/api/courses`;

  const { data, error, isLoading } = useSWR(
    shouldFetchData ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl, 'GET'),
    {
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      dedupingInterval: 3 * 60 * 1000, // allow revalidation each 3 minutes
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading && (data || error)) {
      // even in case of error we don't want to block the user from being considered authenticated
      setIsAuthenticated(true);
    }
  }, [isLoading, data, error]);

  // returns exacly the same properties as userAuth0
  return { ...rest, isAuthenticated };
};

export default useAuthentication;
