import React from 'react';
import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';
import { gtagEvent } from '../utils/analytics.utils';
import useAuthentication from '../hooks/use-authentication';
import CtCubeWhiteIcon from '../icons/CtCubeWhite';

type LoginButtonProps = {
  quizId?: string;
  label: string;
  theme: 'primary' | 'secondary';
};

const LoginButton = (props: LoginButtonProps) => {
  const { loginWithRedirect } = useAuthentication();

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

  if (props.theme === 'primary') {
    return (
      <PrimaryButton
        data-testid="quiz-login-button"
        onClick={() => {
          gtagEvent('login');
          loginWithRedirect({
            appState: {
              returnTo: getTargetUrl(),
            },
          });
        }}
      >
        <CtCubeWhiteIcon />
        <p>
          <b>ID</b> | {props.label}
        </p>
      </PrimaryButton>
    );
  }

  return (
    <SecondaryButton
      data-testid="avatar-login-button"
      onClick={() => {
        gtagEvent('login');
        loginWithRedirect({
          appState: {
            returnTo: getTargetUrl(),
          },
        });
      }}
    >
      {props.label}
    </SecondaryButton>
  );
};

export default LoginButton;
