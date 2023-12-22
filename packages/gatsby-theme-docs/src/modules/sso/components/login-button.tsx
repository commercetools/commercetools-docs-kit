import React from 'react';
import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';
import { gtagEvent } from '../utils/analytics.utils';
import useAuthentication from '../hooks/use-authentication';
import CtCubeWhiteIcon from '../icons/CtCubeWhite';
import {
  AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY,
  AI_ASSISTANT_POST_LOGIN_HASH,
} from '../../ai-assistant/hooks/use-ai-assistant';

type LoginButtonProps = {
  quizId?: string;
  aiAssistantCfg?: object;
  label: string;
  theme: 'primary' | 'secondary';
};

const LoginButton = (props: LoginButtonProps) => {
  const { loginWithRedirect } = useAuthentication();

  const getTargetUrl = () => {
    // login from quiz
    if (props.quizId) {
      const sectionElement = document.getElementById(props.quizId)?.parentNode
        ? (document.getElementById(props.quizId)?.parentNode as HTMLElement)
        : undefined;
      const sectionUrl = sectionElement ? sectionElement.id : '';
      if (sectionUrl.length > 0) {
        return `${window.location.pathname}#${sectionUrl}`;
      }
    }
    // login from ai assistant
    if (props.aiAssistantCfg) {
      const serializedCfg = JSON.stringify(props.aiAssistantCfg);
      // store ai assistant config into local storage
      window.localStorage.setItem(
        AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY,
        serializedCfg
      );
      return `${window.location.pathname}#${AI_ASSISTANT_POST_LOGIN_HASH}`;
    }
    return window.location.pathname;
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
