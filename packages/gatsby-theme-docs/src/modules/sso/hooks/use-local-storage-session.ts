import { useContext, useEffect } from 'react';
import useAuthentication, { LOCAL_STORAGE_SESSION } from './use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import { getLogoutReturnUrl } from '../components/sso.utils';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';

const useLocalStorageSession = () => {
  const { getAuthToken } = useAuthToken();
  const { logout } = useAuthentication();
  const { learnApiBaseUrl, selfLearningFeatures } = useContext(ConfigContext);

  const handleStorageChange = async (event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_SESSION && event.newValue === null) {
      logout({
        logoutParams: {
          returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
        },
      });
    }
    if (event.key === LOCAL_STORAGE_SESSION && event.newValue !== null) {
      // automatically logs in the user if a tab is open
      await getAuthToken();
    }
  };

  useEffect(() => {
    if (!isFeatureEnabled(EFeatureFlag.TabsSessionSync, selfLearningFeatures)) {
      return;
    }
    // Add the event listener when the component mounts
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useLocalStorageSession;
