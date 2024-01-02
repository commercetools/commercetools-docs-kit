import { useContext } from 'react';
import { getLogoutReturnUrl } from './sso.utils';
import ConfigContext from '../../../components/config-context';
import SecondaryButton from './secondary-button';
import { gtagEvent } from '../utils/analytics.utils';
import useAuthentication from '../hooks/use-authentication';
import { onLogout } from '../utils/common.utils';

const LogoutButton = () => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { logout } = useAuthentication();

  return (
    <SecondaryButton
      data-testid="logout-button"
      onClick={() => {
        gtagEvent('logout'); // custom, matching "login"
        onLogout();
        logout({
          logoutParams: {
            returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
          },
        });
      }}
    >
      Log out
    </SecondaryButton>
  );
};

export default LogoutButton;
