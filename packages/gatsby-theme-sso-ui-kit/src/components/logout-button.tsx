import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getLogoutReturnUrl } from './sso.utils';
import ConfigContext from './config-context';
import SecondaryButton from './secondary-button';

const LogoutButton = () => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { logout } = useAuth0();

  return (
    <SecondaryButton
      data-testid="logout-button"
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
          },
        })
      }
    >
      Log out
    </SecondaryButton>
  );
};

export default LogoutButton;
