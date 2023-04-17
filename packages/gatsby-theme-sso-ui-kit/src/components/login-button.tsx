import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { UserFilledIcon } from '@commercetools-uikit/icons';
import Button from './button';

type LoginButtonProps = {
  label: string;
  icon: JSX.Element;
  quizId?: string;
};

const defaultProps: Pick<LoginButtonProps, 'label' | 'icon'> = {
  label: 'Log In',
  icon: <UserFilledIcon data-testid="default-icon" />,
};

const LoginButton = (props: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  const getTargetUrl = () => {
    let sectionUrl = '';
    if (props.quizId) {
      const sectionElement = document.getElementById(props.quizId)?.parentNode
        ? (document.getElementById(props.quizId)?.parentNode as HTMLElement)
        : undefined;
      sectionUrl = sectionElement ? sectionElement.id : '';
    }
    return sectionUrl.length > 0
      ? `${window.location.pathname}#${sectionUrl}`
      : window.location.pathname;
  };

  if (props.quizId) {
    return (
      <SecondaryButton
        data-testid="login-button"
        {...props}
        label={props.label}
        iconLeft={props.icon}
        onClick={() =>
          loginWithRedirect({
            appState: {
              returnTo: getTargetUrl(),
            },
          })
        }
      />
    );
  }

  return (
    <Button
      data-testid="login-button"
      onClick={() =>
        loginWithRedirect({
          appState: {
            returnTo: getTargetUrl(),
          },
        })
      }
    >
      Login
    </Button>
  );
};
LoginButton.defaultProps = defaultProps;

export default LoginButton;
