import React from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { UserFilledIcon } from '@commercetools-uikit/icons';
import useEnrichedAuth0 from '../hooks/use-enriched-auth0';

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
  const { loginWithRedirect } = useEnrichedAuth0();

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

  const handleOnClick = () => {
    document.dispatchEvent(new CustomEvent('beforeAuth0LoginRedirect'));
    loginWithRedirect({
      appState: {
        returnTo: getTargetUrl(),
      },
    });
  };

  return (
    <SecondaryButton
      data-testid="login-button"
      {...props}
      label={props.label}
      iconLeft={props.icon}
      onClick={handleOnClick}
    />
  );
};
LoginButton.defaultProps = defaultProps;

export default LoginButton;
