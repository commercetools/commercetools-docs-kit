import { useState, useContext, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import ConfigContext from '../../../components/config-context';
import type { QuizAttempt } from '../components/quiz';
import { useAuthToken } from './use-auth-token';
import type { SubmissionAttempt } from '../components/quiz.types';
import { MaintenanceModeError, ServiceDownError } from './use-attempt';
import { gtagEvent } from '../../sso/utils/analytics.utils';
import { useAsyncComplete } from '../../../hooks/use-async-complete';

type SubmitAttemptParams = {
  courseId: string;
  quizId: string;
};

export const useSubmitAttempt = (submitAttemptParams: SubmitAttemptParams) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { mutate } = useSWRConfig();
  const { courseId, quizId } = submitAttemptParams;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<QuizAttempt | undefined>();
  const [correlationId, setCorrelationId] = useState<string | undefined>();
  const { getAuthToken } = useAuthToken();
  const { setAsyncLoading } = useAsyncComplete(
    `/api/courses/${courseId}/quizzes/${quizId}/attempts/submit`
  );

  const submitNewAttempt = useCallback(
    async (
      attemptId: number,
      attemptData: SubmissionAttempt,
      finish: boolean
    ) => {
      const invalidateCache = () => {
        mutate('/api/courses');
        mutate(`/api/courses/${courseId}`);
      };
      const apiEndpoint = `${learnApiBaseUrl}/api/courses/${courseId}/quizzes/${quizId}/attempts/${attemptId}?finish=${finish}`;
      const accessToken = await getAuthToken();
      const data = await fetch(apiEndpoint, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(attemptData),
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
      });
      invalidateCache();
      gtagEvent('submit_quiz', {
        course_id: courseId.toString(),
        quiz_id: quizId.toString(),
      });
      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, getAuthToken, learnApiBaseUrl, quizId, mutate]
  );

  const submitAttempt = useCallback(
    async (
      attemptId: number,
      attemptData: SubmissionAttempt,
      finish: boolean
    ) => {
      try {
        setIsLoading(true);
        setAsyncLoading(true);
        const data = await submitNewAttempt(attemptId, attemptData, finish);
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
          const message = `Error while submitting answers courseId: ${courseId}, quizId: ${quizId}, attemptId: ${attemptId}, finish: ${finish}`;
          console.error(message);
          setError('Error submitting answers');
        }
      } finally {
        setIsLoading(false);
        setAsyncLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, quizId, submitNewAttempt]
  );

  return {
    submitAttempt,
    attempt: data,
    isLoading,
    error,
    correlationId,
  };
};
