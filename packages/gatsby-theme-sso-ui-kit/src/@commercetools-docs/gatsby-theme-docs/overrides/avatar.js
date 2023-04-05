// A React component to be rendered in the top bar next to the top menu toggle button
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { useSelect } from 'downshift';
import styled from '@emotion/styled';
import Avatar from '@commercetools-uikit/avatar';
import Spacings from '@commercetools-uikit/spacings';
import { designSystem } from '@commercetools-docs/ui-kit';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import ConfigContext from '../../../components/config-context';
import {
  getAvatarInitials,
  getLogoutReturnUrl,
} from '../../../components/sso.utils';
import CommercetoolsIDIcon from '../../../icons/commercetools_ID_logo.svg';
import useEnrichedAuth0 from '../../../hooks/use-enriched-auth0';

const AUTH0_CUSTOM_CLAIM_NS = 'https://docs.commercetools.com/';
const AUTH0_CLAIM_DISPLAYNAME = `${AUTH0_CUSTOM_CLAIM_NS}display_name`;
const AUTH0_CLAIM_GLOBAL_ACCOUNT_NAME = `${AUTH0_CUSTOM_CLAIM_NS}global_account_name`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AvatarButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  display: flex;
  background: transparent;
`;

const DropdownContainer = styled.div`
  color: #666666;
  min-width: 200px;
  padding: ${designSystem.dimensions.spacings.s};
  border: 1px solid ${designSystem.colors.light.borderInput};
  position: absolute;
  margin-top: 30px;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
  box-shadow: ${designSystem.tokens.shadowForBetaFlag};
`;

const CommercetoolsIDLogo = styled.div`
  height: 42px;
  width: 70px;
  margin: 0 auto;
`;

const LogoutSection = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderInput};
  :hover {
    background-color: ${designSystem.colors.light.surfaceSecondary1};
  }
`;

const LogoutButton = styled.button`
  color: #666666;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  padding: 6px 0 0 0;
  cursor: pointer;
  border: none;
  width: 100%;
  background: transparent;
`;

const MenuItem = styled.div`
  padding: 0;
  font-family: ${designSystem.typography.fontFamilies.primary};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  text-align: ${(props) => props.align || 'left'};
  font-weight: ${(props) =>
    props.type === 'primary'
      ? designSystem.typography.fontWeights.bold
      : designSystem.typography.fontWeights.regular};
`;

const UserAvatar = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const email = props.userData.find(
    (item) => Object.keys(item)[0] === 'email'
  )?.email;
  const name = props.userData.find(
    (item) => Object.keys(item)[0] === 'name'
  )?.name;
  const avatarInitials = getAvatarInitials(name || email);
  return (
    <div
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      <Spacings.Inline alignItems="center">
        <Avatar
          size="s"
          gravatarHash={md5(email || '')}
          firstName={avatarInitials[0]}
          lastName={avatarInitials[1]}
          isHighlighted={isMouseOver}
        />
        {props.isOpen ? (
          <AngleUpIcon
            size="medium"
            color={isMouseOver ? 'neutral60' : 'solid'}
          />
        ) : (
          <AngleDownIcon
            size="medium"
            color={isMouseOver ? 'neutral60' : 'solid'}
          />
        )}
      </Spacings.Inline>
    </div>
  );
};
UserAvatar.displayName = 'UserAvatar';

const UserInformation = (props) => {
  const { learnApiBaseUrl } = useContext(ConfigContext);
  const { isOpen, getToggleButtonProps, getMenuProps } = useSelect({
    items: Object.values(props.userData),
  });

  const handleLogoutClick = () => {
    document.dispatchEvent(new CustomEvent('beforeAuth0Logout'));
    props.logout({
      logoutParams: {
        returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
      },
    });
  };

  return (
    <AvatarContainer data-test-id="avatar-container">
      <AvatarButton {...getToggleButtonProps()}>
        <UserAvatar userData={props.userData} isOpen={isOpen} />
      </AvatarButton>
      {isOpen && (
        <DropdownContainer {...getMenuProps()}>
          <Spacings.Stack scale="xs">
            <CommercetoolsIDLogo>
              <CommercetoolsIDIcon />
            </CommercetoolsIDLogo>
            {props.userData.map((obj, index) => {
              const [key, data] = Object.entries(obj)[0];
              return (
                <MenuItem
                  key={key}
                  align="center"
                  type={index === 0 ? 'primary' : 'secondary'}
                >
                  {data}
                </MenuItem>
              );
            })}

            <LogoutSection>
              <LogoutButton
                data-test-id="avatar-menu-logout"
                onClick={handleLogoutClick}
              >
                <MenuItem type="secondary">Logout</MenuItem>
              </LogoutButton>
            </LogoutSection>
          </Spacings.Stack>
        </DropdownContainer>
      )}
    </AvatarContainer>
  );
};

UserInformation.displayName = 'UserInformation';

const UserProfile = () => {
  const { isAuthenticated, logout, getIdTokenClaims } = useEnrichedAuth0();
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

    if (customClaims[AUTH0_CLAIM_GLOBAL_ACCOUNT_NAME]) {
      userData.push({
        association: customClaims[AUTH0_CLAIM_GLOBAL_ACCOUNT_NAME],
      });
    }

    return <UserInformation userData={userData} logout={logout} />;
  }
  return null;
};

UserProfile.displayName = 'UserProfile';

UserAvatar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  userData: PropTypes.array.isRequired,
};

UserInformation.propTypes = {
  userData: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserProfile;
