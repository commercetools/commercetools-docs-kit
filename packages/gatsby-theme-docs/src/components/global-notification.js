import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { InformationIcon, WarningIcon } from '@commercetools-uikit/icons';
import { designSystem } from '@commercetools-docs/ui-kit';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';

const getIconByType = (type) => {
  switch (type) {
    case 'warning':
      return WarningIcon;
    default:
      return InformationIcon;
  }
};
const getIconColorByType = (type) => {
  switch (type) {
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};
const Container = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  background-color: ${(props) => {
    switch (props.type) {
      case 'warning':
        return designSystem.colors.light.surfaceWarning;
      case 'error':
        return designSystem.colors.light.surfaceError;
      default:
        return designSystem.colors.light.surfaceInfo;
    }
  }};
  border-width: 1px 0;
  border-style: solid;
  border-color: ${(props) => {
    switch (props.type) {
      case 'warning':
        return designSystem.colors.light.textWarning;
      default:
        return designSystem.colors.light.textInfo;
    }
  }};
  padding: ${designSystem.dimensions.spacings.s};
  max-height: ${designSystem.dimensions.heights.globalNotificationContent};
  overflow: hidden;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: ${designSystem.dimensions.spacings.s}
      ${designSystem.dimensions.spacings.xl};
  }
`;

const GlobalNotification = (props) => {
  const Icon = getIconByType(props.type);
  const iconColor = getIconColorByType(props.type);
  return (
    <Container type={props.type}>
      <SpacingsInline scale="s" alignItems="baseline">
        <div>
          <Icon color={iconColor} />
        </div>
        <div>{markdownFragmentToReact(props.children)}</div>
      </SpacingsInline>
    </Container>
  );
};
GlobalNotification.propTypes = {
  type: PropTypes.oneOf(['warning', 'info']).isRequired,
  children: PropTypes.node.isRequired,
};

export default GlobalNotification;
