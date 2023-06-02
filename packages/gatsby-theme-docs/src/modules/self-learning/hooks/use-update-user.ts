import { useState, useContext, useCallback } from 'react';
import { gtagEvent } from '../../sso';
import ConfigContext from '../../../components/config-context';
import type { QuizAttempt } from '../components/quiz';
import { useAuthToken } from './use-auth-token';
import { User } from '@auth0/auth0-react';
import { MaintenanceModeError, ServiceDownError } from './use-attempt';

type UpdateUserParams = {
  userId: string;
};

export const useUpdateUser = (updateUserParams: UpdateUserParams) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { userId } = updateUserParams;
  const { getAuthToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<QuizAttempt | undefined>();
  const [correlationId, setCorrelationId] = useState<string | undefined>();

  const updateUser = useCallback(
    async (newUser: User): Promise<Response> => {
      const apiEndpoint = `${learnApiBaseUrl}/api/users/${userId}`;
      const accessToken = await getAuthToken();
      const data = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      gtagEvent('update_userinfo');
      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, getAuthToken, learnApiBaseUrl]
  );

  const performUpdateUser = useCallback(
    async (newuser: User) => {
      try {
        setIsLoading(true);
        const data = await updateUser(newuser);
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
          const message = `Error while updating user: ${userId}`;
          console.error(message);
          setError('Unable to update user');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [updateUser, userId]
  );

  return {
    performUpdateUser,
    updatedUser: data,
    isLoading,
    error,
    correlationId,
  };
};
