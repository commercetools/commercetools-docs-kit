import { useState, useContext, useCallback } from 'react';
import ConfigContext from '../../../components/config-context';
import type { QuizAttempt } from '../components/quiz';
import { useAuthToken } from './use-auth-token';
import { MaintenanceModeError, ServiceDownError } from './use-attempt';
import { useAsyncComplete } from '../../../hooks/use-async-complete';

type VerificationEmailParams = {
  userId: string;
};

export const useSendVerificationEmail = (
  verificationEmailParams: VerificationEmailParams
) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { userId } = verificationEmailParams;
  const { getAuthToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<QuizAttempt | undefined>();
  const [correlationId, setCorrelationId] = useState<string | undefined>();
  const { setAsyncLoading } = useAsyncComplete(
    `/api/users/${userId}/send-verify-email`
  );

  const sendVerificationEmail = useCallback(
    async (): Promise<Response> => {
      const apiEndpoint = `${learnApiBaseUrl}/api/users/${userId}/send-verify-email`;
      const accessToken = await getAuthToken();
      const data = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, getAuthToken, learnApiBaseUrl]
  );

  const performSendVerificationEmail = useCallback(
    async () => {
      try {
        setIsLoading(true);
        setAsyncLoading(true);
        const data = await sendVerificationEmail();
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
          if (json?.errors?.length > 0) {
            throw new Error(json?.errors[0].message);
          }
          setData(json.result);
        }
      } catch (error) {
        if (
          error instanceof MaintenanceModeError ||
          error instanceof ServiceDownError
        ) {
          console.error(error.message);
          setError(error.message);
        } else {
          const message = `Error while sending verification email: ${userId}`;
          console.error(message);
          setError('Unable to send verification email');
        }
      } finally {
        setAsyncLoading(false);
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendVerificationEmail, userId]
  );

  return {
    performSendVerificationEmail,
    sendVerificationEmail: data,
    isLoading,
    error,
    correlationId,
  };
};
