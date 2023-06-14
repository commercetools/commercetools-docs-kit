// A React component to be rendered in the top bar next to the top menu toggle button
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { AUTH0_CLAIM_DISPLAYNAME } from '../sso.const';

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

const UserAvatar = (props) => {
  const { openProfileModal } = useContext(LearningContext);
  const [avatarInitials, setAvatarInitials] = useState('');
  useEffect(() => {
    const email = props.userData.find(
      (item) => Object.keys(item)[0] === 'email'
    )?.email;
    const name = props.userData.find(
      (item) => Object.keys(item)[0] === 'name'
    )?.name;
    setAvatarInitials(
      getAvatarInitials(name || email).map((initial) => initial.toUpperCase())
    );
  }, [props.userData]);

  return (
    <Spacings.Inline alignItems="center">
      <Avatar
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

const LoggedInState = (props) => {
  return (
    <AvatarContainer data-testid="avatar-container">
      <LogoutButton />
      <UserAvatar userData={props.userData} />
    </AvatarContainer>
  );
};

LoggedInState.displayName = 'LoggedInState';

const LoggedOutState = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return isLoading ? null : (
    <AvatarContainer>
      <LoginButton
        theme="secondary"
        label="Log in"
        data-testid="login-button"
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
  const { isAuthenticated, logout } = useAuth0();
  const {
    user: { profile },
  } = useContext(LearningContext);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (isAuthenticated) {
      const localUserData = [];
      if (profile?.name && profile.name !== profile.email) {
        localUserData.push({ name: profile.name });
      } else if (
        // only if profile.name doesn't exist (as it happens upon new user registration)
        // we fallback to the displayname custom claim
        profile?.[AUTH0_CLAIM_DISPLAYNAME] &&
        profile[AUTH0_CLAIM_DISPLAYNAME] !== profile.email
      ) {
        localUserData.push({ name: profile[AUTH0_CLAIM_DISPLAYNAME] });
      }

      localUserData.push({ email: profile?.email || '' });
      setUserData(localUserData);
    } else {
      setUserData([]);
    }
  }, [isAuthenticated, profile]);

  if (isAuthenticated) {
    return <LoggedInState userData={userData} logout={logout} />;
  }
  return <LoggedOutState />;
};

UserProfile.displayName = 'UserProfile';

UserAvatar.propTypes = {
  userData: PropTypes.array.isRequired,
};

LoggedInState.propTypes = {
  userData: PropTypes.array.isRequired,
};

export default UserProfile;
