import { useState, useContext, useCallback } from 'react';
import ConfigContext from '../components/config-context';
import type { QuizAttempt } from '../components/quiz';
import { useAuthToken } from './use-auth-token';

type FetchAttemptParams = {
  courseId: string;
  quizId: string;
};

export class MaintenanceModeError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MaintenanceModeError.prototype);
  }
}

export class ServiceDownError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MaintenanceModeError.prototype);
  }
}

export const useAttempt = (fetchAttemptParams: FetchAttemptParams) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { courseId, quizId } = fetchAttemptParams;
  const { getAuthToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<QuizAttempt | undefined>();
  const [correlationId, setCorrelationId] = useState<string | undefined>();

  const getNewAttempt = useCallback(
    async (forceNew: boolean): Promise<Response> => {
      const apiEndpoint = `${learnApiBaseUrl}/api/courses/${courseId}/quizzes/${quizId}/attempts?forceNew=${forceNew}`;
      const accessToken = await getAuthToken();
      const data = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, getAuthToken, learnApiBaseUrl, quizId]
  );

  const fetchAttempt = useCallback(
    async (forceNew: boolean) => {
      try {
        setIsLoading(true);
        const data = await getNewAttempt(forceNew);
        const correlationId = data.headers.get('X-Correlation-ID');
        if (correlationId) {
          setCorrelationId(correlationId);
        }
        if (data.status !== 200) {
          if (data.status === 403) {
            throw new MaintenanceModeError(
              'Our learning management system is currently ongoing scheduled maintenance, please try again later'
            );
          }
          if (data.status === 503) {
            throw new ServiceDownError(
              'Our learning management system is currently unavailable'
            );
          }
          throw new Error();
        } else {
          const json = await data.json();
          setData(json);
        }
      } catch (error) {
        if (
          error instanceof MaintenanceModeError ||
          error instanceof ServiceDownError
        ) {
          console.error(error.message);
          setError(error.message);
        } else {
          const message = `Error while fetching answers courseId: ${courseId}, quizId: ${quizId}, forceNew: ${forceNew}`;
          console.error(message);
          setError('Unable to load quiz');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [courseId, getNewAttempt, quizId]
  );

  return {
    fetchAttempt,
    attempt: data,
    isLoading,
    error,
    correlationId,
  };
};
