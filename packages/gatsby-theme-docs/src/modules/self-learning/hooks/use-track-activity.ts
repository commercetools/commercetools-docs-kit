import useSWR, { useSWRConfig } from 'swr';
import { useContext, useEffect, useState } from 'react';
import ConfigContext from '../../../components/config-context';
import { fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';
import useAuthentication from '../../sso/hooks/use-authentication';

export const useTrackActivity = (courseId?: number, activityId?: number) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();
  const { isAuthenticated } = useAuthentication();
  const [doTrack, setDoTrack] = useState<boolean>(false);
  const [canTrack, setCanTrack] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const apiEndpoint = `/api/courses/${courseId}/activities/${activityId}`;

  useEffect(() => {
    setCanTrack(
      isAuthenticated && courseId !== undefined && activityId !== undefined
    );
  }, [courseId, activityId, isAuthenticated]);

  const { data, error, isLoading } = useSWR(
    canTrack && doTrack ? apiEndpoint : null,
    (url) =>
      fetcherWithToken(url, getAuthToken, learnApiBaseUrl, 'POST', {
        completed,
      }),
    {
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !error && data) {
      // in case of a successfull response, we invalidate courses' cache
      mutate('/api/courses');
      mutate(`/api/courses/${courseId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, error, courseId]);

  const trackActivity = (completed: boolean) => {
    setCompleted(completed);
    setDoTrack(true);
  };

  return {
    data,
    error,
    isLoading,
    trackActivity,
  };
};
