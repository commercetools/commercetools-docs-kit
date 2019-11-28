import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import UnstyledInformationIcon from '../icons/information-icon.svg';
import UnstyledWarningIcon from '../icons/warning.svg';
import UnstyledErrorIcon from '../icons/error.svg';
import createStyledIcon from '../utils/create-styled-icon';
import { colors, tokens, dimensions } from '../design-system';
import Spacings from './spacings';

const InformationIcon = createStyledIcon(UnstyledInformationIcon);
const WarningIcon = createStyledIcon(UnstyledWarningIcon);
const ErrorIcon = createStyledIcon(UnstyledErrorIcon);

const getIconByType = type => {
  switch (type) {
    case 'warning':
      return WarningIcon;
    case 'error':
      return ErrorIcon;
    default:
      return InformationIcon;
  }
};
const getIconColorByType = type => {
  switch (type) {
    case 'warning':
      return 'textWarning';
    case 'error':
      return 'textError';
    default:
      return 'textInfo';
  }
};
const Container = styled.div`
  background-color: ${props => {
    switch (props.type) {
      case 'warning':
        return colors.light.surfaceWarning;
      case 'error':
        return colors.light.surfaceError;
      default:
        return colors.light.surfaceInfo;
    }
  }};
  border: 1px solid
    ${props => {
      switch (props.type) {
        case 'warning':
          return colors.light.textWarning;
        case 'error':
          return colors.light.textError;
        default:
          return colors.light.textInfo;
      }
    }};
  border-radius: ${tokens.borderRadius6};
  padding: ${dimensions.spacings.m};
  min-width: 100%;
`;

const ContentNotification = props => {
  const Icon = getIconByType(props.type);
  const iconColor = getIconColorByType(props.type);
  return (
    <Container type={props.type}>
      <Spacings.Inline scale="s" alignItems="flex-start">
        <div>
          <Icon color={iconColor} />
        </div>
        {/* NOTE: we assume that the content of the elements in the MDX file
        respects the empty lines between the component declaration, in order
        for MDX to parse the content into React components.
        See https://github.com/mdx-js/mdx/issues/628

        Example (does not work):
          <Info>
            This *is* **markdown**!
          </Info>

        Example (it works):
          <Info>

            This *is* **markdown**!

          </Info>
        */}
        <div>{props.children}</div>
      </Spacings.Inline>
    </Container>
  );
};
ContentNotification.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'info']).isRequired,
  showBeta: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
ContentNotification.defaultProps = {
  type: 'info',
  showBeta: false,
};

const Info = props => <ContentNotification {...props} type="info" />;
const Error = props => <ContentNotification {...props} type="error" />;
const Warning = props => <ContentNotification {...props} type="warning" />;

export default { Info, Error, Warning };
