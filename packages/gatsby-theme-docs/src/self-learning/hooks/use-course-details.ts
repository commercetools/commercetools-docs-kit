import useSWR from 'swr';
import { useContext } from 'react';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import type {
  ApiCallResult,
  CourseWithDetails,
  CourseTopic,
} from '../external-types';
import { fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';

type UseFetchCoursesIdResponse = {
  data: ApiCallResult<CourseWithDetails> | undefined;
  error: string;
  isLoading: boolean;
};

export const useFetchCourseDetails = (
  courseId: number
): {
  data: ApiCallResult<CourseWithDetails> | undefined;
  error: string | undefined;
  isLoading: boolean;
} => {
  const { learnApiBaseUrl, selfLearningFeatures } = useContext(ConfigContext);
  const { isAuthenticated } = useAuth0();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/courses/${courseId}`;

  // fetch data only if course status feature flag is true and the user is logged in
  const shouldFetchData =
    courseId &&
    isFeatureEnabled(EFeatureFlag.CourseStatus, selfLearningFeatures) &&
    isAuthenticated;

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
  ) as UseFetchCoursesIdResponse;
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
