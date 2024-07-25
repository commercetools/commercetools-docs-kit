// A React component to be rendered in the top bar next to the top menu toggle button
import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Spacings from '@commercetools-uikit/spacings';
import { designSystem } from '@commercetools-docs/ui-kit';
import LoginButton from './login-button';
import { getAvatarInitials } from './sso.utils';
import useAuthentication from '../hooks/use-authentication';
import { useSiteData } from '../../../hooks/use-site-data';
import {
  AuthenticatedContextState,
  AuthenticatedContextApi,
} from '../../../components/authenticated-context';

const AvatarContainer = styled.div`
  padding-right: ${designSystem.dimensions.spacings.s};
`;

const Avatar = styled.div`
  width: ${designSystem.typography.lineHeights.cardSmallTitle};
  height: ${designSystem.typography.lineHeights.cardSmallTitle};
  color: ${designSystem.colors.light.linkHover};
  background-color: ${designSystem.colors.light.surfaceForAvatarIcon};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserAvatar = () => {
  const { openProfileModal } = useContext(AuthenticatedContextApi);
  const {
    user: { profile },
  } = useContext(AuthenticatedContextState);
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
    <UserAvatar />
  </AvatarContainer>
);

LoggedInState.displayName = 'LoggedInState';

const LoggedOutState = () => {
  const { isLoading } = useAuthentication();
  const siteData = useSiteData();
  const isSelfLearning = siteData.siteMetadata?.isSelfLearning;

  return isLoading || !isSelfLearning ? null : (
    <LoginButton
      theme="primary"
      label="Log in"
      data-testid="avatar-login-button"
      showSmallScreenAlternative
    />
  );
};

LoggedOutState.displayName = 'LoggedOutState';

const UserProfile = () => {
  const { isAuth0Authenticated } = useAuthentication();

  return isAuth0Authenticated ? <LoggedInState /> : <LoggedOutState />;
};

UserProfile.displayName = 'UserProfile';

export default UserProfile;
