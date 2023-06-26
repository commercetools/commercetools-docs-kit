// A React component to be rendered in the top bar next to the top menu toggle button
import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAuth0 } from '@auth0/auth0-react';
import Spacings from '@commercetools-uikit/spacings';
import { designSystem } from '@commercetools-docs/ui-kit';
import { GraduationCapIcon } from '@commercetools-uikit/icons';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import PrimaryButton from './primary-button';
import { getAvatarInitials } from './sso.utils';
import { gtagEvent } from '../utils/analytics.utils';
import { LearningContext } from '../../self-learning';

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: ${designSystem.dimensions.spacings.s};
`;

const Avatar = styled.div`
  width: ${designSystem.typography.lineHeights.cardSmallTitle};
  height: ${designSystem.typography.lineHeights.cardSmallTitle};
  color: white;
  background-color: ${designSystem.colors.light.link};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserAvatar = () => {
  const {
    openProfileModal,
    user: { profile },
  } = useContext(LearningContext);
  const [avatarInitials, setAvatarInitials] = useState('');
  useEffect(() => {
    setAvatarInitials(
      getAvatarInitials(profile).map((initial) => initial.toUpperCase())
    );
  }, [profile]);

  return (
    <Spacings.Inline alignItems="center">
      <Avatar
        data-testid="avatar-icon"
        onClick={() =>
          openProfileModal({
            title: 'Update your profile.',
            isDismissable: true,
          })
        }
      >
        {avatarInitials}
      </Avatar>
    </Spacings.Inline>
  );
};
UserAvatar.displayName = 'UserAvatar';

const LoggedInState = () => (
  <AvatarContainer data-testid="avatar-container">
    <LogoutButton />
    <UserAvatar />
  </AvatarContainer>
);

LoggedInState.displayName = 'LoggedInState';

const LoggedOutState = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return isLoading ? null : (
    <AvatarContainer>
      <LoginButton
        theme="secondary"
        label="Log in"
        data-testid="avatar-login-button"
      />
      <PrimaryButton
        onClick={() => {
          gtagEvent('sign_up');
          loginWithRedirect({
            appState: {
              returnTo: window.location.pathname,
            },
            authorizationParams: {
              screen_hint: 'signup',
            },
          });
        }}
      >
        <GraduationCapIcon color="surface" />
        <p>Sign up</p>
      </PrimaryButton>
    </AvatarContainer>
  );
};

LoggedOutState.displayName = 'LoggedOutState';

const UserProfile = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LoggedInState /> : <LoggedOutState />;
};

UserProfile.displayName = 'UserProfile';

export default UserProfile;
