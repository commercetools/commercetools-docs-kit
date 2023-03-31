import useSWR from 'swr';
import { useContext } from 'react';
import ConfigContext from '../components/config-context';
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
  const {
    learnApiBaseUrl,
    features: { courseStatusIndicator },
  } = useContext(ConfigContext);
  const { isAuthenticated } = useAuth0();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/courses/${courseId}`;

  // fetch data only if course status feature flag is true and the user is logged in
  const shouldFetchData = courseId && courseStatusIndicator && isAuthenticated;

  const { data, error, isLoading } = useSWR(
    shouldFetchData ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl)
  ) as UseFetchCoursesIdResponse;
  return {
    data,
    error,
    isLoading,
  };
};

export const getTopicStatusByPageTitle = (
  topics: CourseTopic[],
  pageTitle: string
) => {
  const matchingTopic = topics.find(
    (topic) =>
      topic.name.trim().toLowerCase() === pageTitle.trim().toLowerCase()
  );
  if (matchingTopic) {
    return matchingTopic.completed ? 'completed' : 'notCompleted';
  }
  return 'unknown';
};
