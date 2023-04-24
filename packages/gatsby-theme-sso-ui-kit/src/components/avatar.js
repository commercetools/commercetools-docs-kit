// A React component to be rendered in the top bar next to the top menu toggle button
import { useEffect, useState } from 'react';
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
`;

const UserAvatar = (props) => {
  const email = props.userData.find(
    (item) => Object.keys(item)[0] === 'email'
  )?.email;
  const name = props.userData.find(
    (item) => Object.keys(item)[0] === 'name'
  )?.name;
  const avatarInitials = getAvatarInitials(name || email).map((initial) =>
    initial.toUpperCase()
  );
  return (
    <Spacings.Inline alignItems="center">
      <Avatar>{avatarInitials}</Avatar>
    </Spacings.Inline>
  );
};
UserAvatar.displayName = 'UserAvatar';

const LoggedInState = (props) => {
  return (
    <AvatarContainer>
      <LogoutButton />
      <UserAvatar userData={props.userData} />
    </AvatarContainer>
  );
};

LoggedInState.displayName = 'LoggedInState';

const LoggedOutState = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <AvatarContainer>
      <LoginButton data-test-id="login-button" label="Login" />
      <PrimaryButton
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              screen_hint: 'signup',
            },
          })
        }
      >
        <GraduationCapIcon color="surface" />
        <p>Sign up</p>
      </PrimaryButton>
    </AvatarContainer>
  );
};

LoggedOutState.displayName = 'LoggedOutState';

const UserProfile = () => {
  const { isAuthenticated, logout, getIdTokenClaims } = useAuth0();
  const [customClaims, setCustomClaims] = useState({});
  useEffect(() => {
    const fetchCustomClaims = async () => {
      try {
        const results = await getIdTokenClaims();
        setCustomClaims(results);
      } catch (error) {
        console.error('error fetching custom claims');
      }
    };
    if (isAuthenticated) {
      fetchCustomClaims();
    }
  }, [isAuthenticated, getIdTokenClaims]);

  if (isAuthenticated) {
    const userData = [];

    if (customClaims[AUTH0_CLAIM_DISPLAYNAME] !== customClaims.email) {
      // we do have a real full name
      userData.push({ name: customClaims[AUTH0_CLAIM_DISPLAYNAME] });
    }

    userData.push({ email: customClaims.email });

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
