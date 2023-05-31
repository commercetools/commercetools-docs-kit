import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { UserFilledIcon } from '@commercetools-uikit/icons';
import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';
import { gtagEvent } from '../utils/analytics.utils';

type LoginButtonProps = {
  quizId?: string;
  icon?: JSX.Element;
  label: string;
  theme: 'primary' | 'secondary';
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

  if (props.theme === 'primary') {
    return (
      <PrimaryButton
        data-test-id="login-quiz-button"
        onClick={() => {
          gtagEvent('login');
          loginWithRedirect({
            appState: {
              returnTo: getTargetUrl(),
            },
          });
        }}
      >
        {props.icon}
        <p>{props.label}</p>
      </PrimaryButton>
    );
  }

  return (
    <SecondaryButton
      data-testid="login-button"
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
