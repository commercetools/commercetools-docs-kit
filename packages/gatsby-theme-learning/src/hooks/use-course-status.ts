import useSWR from 'swr';
import { useContext } from 'react';
import ConfigContext from '../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import type {
  ApiCallResult,
  Course,
  CourseStatus,
  EnrolledCourses,
} from '../external-types';
import { fetcherWithToken } from './hooks.utils';
import { useAuthToken } from './use-auth-token';

/**
 * Standar CourseStatus plus
 * - notEnrolled: when a course exists on the platform but the user is not enrolled
 * - notAvailable: when any unexpected situation happens
 */
type ClientCourseStatus = CourseStatus | 'notEnrolled' | 'notAvailable';
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
  const {
    learnApiBaseUrl,
    features: { courseStatusIndicator },
  } = useContext(ConfigContext);
  const { isAuthenticated } = useAuth0();
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `/api/courses`;

  // fetch data only if course status feature flag is true and the user is logged in
  const shouldFetchData = courseStatusIndicator && isAuthenticated;

  const { data, error, isLoading } = useSWR(
    shouldFetchData ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAuthToken, learnApiBaseUrl)
  ) as UseFetchCoursesResponse;
  return {
    data,
    error,
    isLoading,
  };
};

export const getCourseStatusByCourseId = (
  courses: Course[],
  courseId: number
): ClientCourseStatus => {
  if (!courses || !courseId) {
    console.warn('getCourseStatusByCourseId expects courses list and courseId');
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
