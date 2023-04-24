import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserFilledIcon } from '@commercetools-uikit/icons';
import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';

type LoginButtonProps = {
  quizId?: string;
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
      <PrimaryButton
        data-testid="login-button"
        onClick={() =>
          loginWithRedirect({
            appState: {
              returnTo: getTargetUrl(),
            },
          })
        }
      >
        <UserFilledIcon color="surface" />
        <p>Login to start the quiz</p>
      </PrimaryButton>
    );
  }

  return (
    <SecondaryButton
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
    </SecondaryButton>
  );
};

export default LoginButton;
