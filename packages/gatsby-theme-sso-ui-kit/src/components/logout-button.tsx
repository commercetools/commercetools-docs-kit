import { useContext } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { LogoutIcon } from '@commercetools-uikit/icons';
import { getLogoutReturnUrl } from './sso.utils';
import ConfigContext from './config-context';
import useEnrichedAuth0 from '../hooks/use-enriched-auth0';
import type { LogoutOptions } from '@auth0/auth0-react';

type LogoutButtonProps = {
  label: string;
  icon: JSX.Element;
};

const defaultProps: Pick<LogoutButtonProps, 'label' | 'icon'> = {
  label: 'Log Out',
  icon: <LogoutIcon data-testid="default-icon" />,
};

const LogoutButton = (props: LogoutButtonProps) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { logout } = useEnrichedAuth0();
  // clean SWR local storage cache on logout
  const cleanCacheLogout = (options: LogoutOptions | undefined) => {
    localStorage?.removeItem('app-cache');
    logout(options);
  };

  return (
    <SecondaryButton
      data-testid="logout-button"
      label={props.label}
      iconLeft={props.icon}
      onClick={() =>
        cleanCacheLogout({
          logoutParams: {
            returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
          },
        })
      }
    >
      Log Out
    </SecondaryButton>
  );
};
LogoutButton.defaultProps = defaultProps;

export default LogoutButton;
