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

/**
 * Standar CourseStatus plus
 * - notEnrolled: when a course exists on the platform but the user is not enrolled
 * - notAvailable: when any unexpected situation happens
 */
type ClientCourseStatus = CourseStatus | 'notEnrolled' | 'notAvailable';

class FetchDataError extends Error {
  status: number | undefined;
  info: object | undefined;

  constructor(message: string, status?: number | undefined, info?: object) {
    super(message);
    this.status = status;
    this.info = info;

    Object.setPrototypeOf(this, FetchDataError.prototype);
  }
}

const fetcherWithToken = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: any,
  auth0Domain: string
): Promise<ApiCallResult<EnrolledCourses>> => {
  const responseHandler = async (response: Response) => {
    if (!response.ok) {
      const info = await response.json();
      throw new FetchDataError(
        `HTTP Error while feching data from ${url}`,
        response.status,
        info
      );
    }
    return response.json();
  };

  try {
    // first wait for a token...
    const audience =
      auth0Domain === 'auth.id.commercetools.com'
        ? 'commercetools.eu.auth0.com'
        : auth0Domain;

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${audience}/api/v2/`,
      },
    });

    // ...then performs fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseHandler(response);
  } catch (e) {
    const errMsg = `Error while feching data from ${url}`;
    console.error(errMsg, e);
    throw new FetchDataError(errMsg);
  }
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
