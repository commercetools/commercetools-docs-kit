import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import ConfigContext from '../components/config-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from './use-auth-token';
import type { Course } from '../external-types';

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
      setAuthToken(token);
    };
    fetchToken();
  });

  const { data, error, isLoading } = useSWR(
    isAuthenticated && authToken ? apiEndpoint : null,
    (url) => fetcher(url, authToken || '')
  );
  return {
    data,
    error,
    isLoading,
  };
};
export const useCourseStatusByCouseId = (courseId: number) => {
  const { data, isLoading, error } = useFetchCourses();
  const [courseStatus, setCourseStatus] = useState<string | undefined>();
  useEffect(() => {
    if (!isLoading && data) {
      const filteredCourse = data.result.enrolledCourses.find(
        (course: Course) => course.id === courseId
      );
      if (!filteredCourse) {
        setCourseStatus('unenrolled');
      } else {
        setCourseStatus(filteredCourse.status);
      }
    }
  }, [data, isLoading, error, courseId]);
  return { courseStatus };
};
