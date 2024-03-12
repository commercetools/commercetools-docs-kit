import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import ConfigContext from '../../../components/config-context';
import type { ApiCallResult, UserBadges } from '../external-types';
import { DEFAULT_SWR_FLAGS, fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';
import { useAsyncComplete } from '../../../hooks/use-async-complete';
import useAuthentication from '../../sso/hooks/use-authentication';

type UseFetchBadgesResponse = {
  data: ApiCallResult<UserBadges> | undefined;
  error: string;
  isLoading: boolean;
  isValidating: boolean;
};

export const useFetchBadges = (): {
  data: ApiCallResult<UserBadges> | undefined;
  error: string | undefined;
  isLoading: boolean;
} => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { isAuthenticated } = useAuthentication();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/badges`;
  const { setAsyncLoading } = useAsyncComplete(apiEndpoint);

  // fetch data only if the user is logged in
  const shouldFetchData = isAuthenticated;

  const { data, error, isLoading, isValidating } = useSWR(
    shouldFetchData ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl, 'GET'),
    DEFAULT_SWR_FLAGS
  ) as UseFetchBadgesResponse;

  useEffect(() => {
    setAsyncLoading(isLoading || isValidating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isValidating]);

  return {
    data,
    error,
    isLoading,
  };
};
