import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';
import type {
  ApiCallResult,
  CourseWithDetails,
  CourseTopic,
} from '../external-types';
import { DEFAULT_SWR_FLAGS, fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';
import { useAsyncComplete } from '../../../hooks/use-async-complete';
import useAuthentication from '../../sso/hooks/use-authentication';

type UseFetchCoursesIdResponse = {
  data: ApiCallResult<CourseWithDetails> | undefined;
  error: string;
  isLoading: boolean;
  isValidating: boolean;
};

export const useFetchCourseDetails = (
  courseId: number
): {
  data: ApiCallResult<CourseWithDetails> | undefined;
  error: string | undefined;
  isLoading: boolean;
} => {
  const { learnApiBaseUrl, selfLearningFeatures } = useContext(ConfigContext);
  const { isAuthenticated } = useAuthentication();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/courses/${courseId}`;
  const { setAsyncLoading } = useAsyncComplete(apiEndpoint);

  // fetch data only if course status feature flag is true and the user is logged in
  const shouldFetchData =
    courseId &&
    isFeatureEnabled(EFeatureFlag.CourseStatus, selfLearningFeatures) &&
    isAuthenticated;

  const { data, error, isLoading, isValidating } = useSWR(
    shouldFetchData ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl, 'GET'),
    DEFAULT_SWR_FLAGS
  ) as UseFetchCoursesIdResponse;

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

export const getTopicStatusByPageTitle = (
  topics: CourseTopic[] | undefined,
  pageTitle: string
) => {
  if (!topics || !pageTitle) {
    return 'notAvailable';
  }
  const matchingTopic = topics.find(
    (topic) =>
      topic.name.trim().toLowerCase() === pageTitle.trim().toLowerCase()
  );
  if (matchingTopic) {
    return matchingTopic.completed ? 'completed' : 'inProgress';
  }
  return 'notAvailable';
};
