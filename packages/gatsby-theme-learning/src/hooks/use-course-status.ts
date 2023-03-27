import useSWR from 'swr';
import { useContext } from 'react';
import ConfigContext from '../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from './use-auth-token';
import type {
  ApiCallResult,
  Course,
  CourseStatus,
  EnrolledCourses,
} from '../external-types';

const fetcherWithToken = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: any,
  auth0Domain: string
): Promise<ApiCallResult<EnrolledCourses>> => {
  // first wait for a token
  const audience =
    auth0Domain === 'auth.id.commercetools.com'
      ? 'commercetools.eu.auth0.com'
      : auth0Domain;

  const accessToken = await getAccessTokenSilently({
    authorizationParams: {
      audience: `https://${audience}/api/v2/`,
    },
  });

  const responseHandler = (response: Response) => {
    if (response.status !== 200) {
      // TODO: handle error
    }
    return response.json();
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return responseHandler(response);
};

export const useFetchCourses = (): {
  data: ApiCallResult<EnrolledCourses> | undefined;
  error: string;
  isLoading: boolean;
} => {
  const { learnApiBaseUrl, auth0Domain } = useContext(ConfigContext);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const apiEndpoint = `${learnApiBaseUrl}/api/courses`;

  const { data, error, isLoading } = useSWR(
    isAuthenticated ? apiEndpoint : null,
    (url) => fetcherWithToken(url, getAccessTokenSilently, auth0Domain)
  );
  return {
    data,
    error,
    isLoading,
  };
};

export const getCourseStatusByCourseId = (
  courses: Course[],
  courseId: number
): CourseStatus | 'notEnrolled' | undefined => {
  if (!courses || !courseId) {
    return;
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
