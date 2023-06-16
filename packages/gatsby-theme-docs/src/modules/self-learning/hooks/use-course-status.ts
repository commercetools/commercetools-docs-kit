import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import type {
  ApiCallResult,
  Course,
  CourseStatus,
  EnrolledCourses,
} from '../external-types';
import { fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';
import { useAsyncComplete } from '../../../hooks/use-async-complete';

/**
 * Standar CourseStatus plus
 * - notEnrolled: when a course exists on the platform but the user is not enrolled
 * - notAvailable: when any unexpected situation happens
 */
export type ClientCourseStatus =
  | CourseStatus
  | 'notEnrolled'
  | 'notAvailable'
  | 'isLoading';
type UseFetchCoursesResponse = {
  data: ApiCallResult<EnrolledCourses> | undefined;
  error: string;
  isLoading: boolean;
};

export const useFetchCourses = (): {
  data: ApiCallResult<EnrolledCourses> | undefined;
  error: string | undefined;
  isLoading: boolean;
} => {
  const { learnApiBaseUrl, selfLearningFeatures } = useContext(ConfigContext);
  const { isAuthenticated } = useAuth0();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/courses`;
  const { setAsyncLoading } = useAsyncComplete(apiEndpoint);

  // fetch data only if course status feature flag is true and the user is logged in
  const shouldFetchData =
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
  ) as UseFetchCoursesResponse;

  useEffect(() => {
    setAsyncLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    data,
    error,
    isLoading,
  };
};

export const getCourseStatusByCourseId = (
  courses: Course[] | undefined,
  courseId: number
): ClientCourseStatus => {
  if (!courseId || !courses) {
    console.warn('getCourseStatusByCourseId expects courses && courseId');
    return 'notAvailable';
  }
  const filteredCourse = courses.find(
    (course: Course) => course.id === courseId
  );
  if (!filteredCourse) {
    return 'notEnrolled';
  } else {
    return filteredCourse.status;
  }
};
