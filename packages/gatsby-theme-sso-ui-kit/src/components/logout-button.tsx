import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { LogoutIcon } from '@commercetools-uikit/icons';
import { getLogoutReturnUrl } from './sso.utils';
import ConfigContext from './config-context';

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
  const { logout } = useAuth0();

  return (
    <SecondaryButton
      data-testid="logout-button"
      label={props.label}
      iconLeft={props.icon}
      onClick={() =>
        logout({
          returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
        })
      }
    >
      Log Out
    </SecondaryButton>
  );
};
LogoutButton.defaultProps = defaultProps;

export default LogoutButton;
