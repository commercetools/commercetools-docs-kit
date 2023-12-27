import { useCallback, useContext } from 'react';
import ConfigContext from '../../../components/config-context';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';

const useChatInit = () => {
  const { aiAssistantApiBaseUrl } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();

  const chatInit = useCallback(
    async () => {
      const apiEndpoint = `${aiAssistantApiBaseUrl}/api/assist/init`;
      const accessToken = await getAuthToken();
      try {
        const data = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        return await data.json();
      } catch (error) {
        return undefined;
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAuthToken, aiAssistantApiBaseUrl]
  );

  return { chatInit };
};

export default useChatInit;
