import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import ConfigContext from '../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from './use-auth-token';
import type { Course, CourseStatus } from '../external-types';

const fetcher = async (url: string, accessToken: string) => {
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data.json();
};

const useFetchCourses = () => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const { isAuthenticated } = useAuth0();
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();
  const apiEndpoint = `${learnApiBaseUrl}/api/courses`;
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAuthToken();
      if (token !== authToken) {
        setAuthToken(token);
      }
    };
    if (isAuthenticated) {
      fetchToken();
    }
  }, [isAuthenticated, getAuthToken, authToken]);

  const { data, error, isLoading } = useSWR(
    authToken ? apiEndpoint : null,
    (url) => fetcher(url, authToken || '')
  );
  return {
    data,
    error,
    isLoading,
  };
};

type CourseStatusByCourseId = {
  courseStatus: CourseStatus | 'unenrolled' | undefined; // undefined is used for non self-learning courses
  isLoading: boolean;
  error: string;
};
export const useCourseStatusByCouseId = (
  courseId: number
): CourseStatusByCourseId => {
  const [courseStatus, setCourseStatus] = useState<
    CourseStatus | 'unenrolled' | undefined
  >();
  const { data, isLoading, error } = useFetchCourses();
  useEffect(() => {
    if (!courseId) {
      // the course id is undefined, meaning that the course is not a self-learning course
      setCourseStatus(undefined);
      return;
    }
    if (!isLoading && data) {
      const filteredCourse = (data.result.enrolledCourses as Course[]).find(
        (course: Course) => course.id === courseId
      );

      if (!filteredCourse) {
        setCourseStatus('unenrolled');
      } else {
        setCourseStatus(filteredCourse.status);
      }
    }
  }, [data, isLoading, error, courseId]);
  return { courseStatus, isLoading, error };
};
