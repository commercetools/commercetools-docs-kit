import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import UnstyledInformationIcon from '../icons/information-icon.svg';
import UnstyledWarningIcon from '../icons/warning.svg';
import UnstyledErrorIcon from '../icons/error.svg';
import createStyledIcon from '../utils/create-styled-icon';
import markdown2React from '../utils/markdown-2-react';
import { pxToRem, colors, tokens, dimensions } from '../design-system';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: ${dimensions.spacings.m};
  margin: ${dimensions.spacings.s} 0;
  border: ${pxToRem('1px')} solid ${colors.light.borderInfo};
  border-radius: ${tokens.borderRadius6};
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToRem('24px')};
  height: ${pxToRem('24px')};
`;

const InfoTextWrapper = styled.div`
  margin-left: ${dimensions.spacings.s};
`;

function Box(props) {
  return (
    <Container css={props.containerCustomStyle}>
      <IconWrapper>{renderIcon(props.icon)}</IconWrapper>
      <InfoTextWrapper>{markdown2React(props.children)}</InfoTextWrapper>
    </Container>
  );

  function renderIcon(icon) {
    const InformationIcon = createStyledIcon(UnstyledInformationIcon);
    const WarningIcon = createStyledIcon(UnstyledWarningIcon);
    const ErrorIcon = createStyledIcon(UnstyledErrorIcon);

    switch (icon) {
      case 'warning':
        return <WarningIcon color="iconWarning" />;
      case 'error':
        return <ErrorIcon color="iconError" />;
      default:
        return <InformationIcon color="iconInfo" />;
    }
  }
}

Box.propTypes = {
  containerCustomStyle: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function Info(props) {
  const containerCustomStyle = css`
    border-color: ${colors.light.iconInfo};
    background-color: ${colors.light.surfaceInfo2};
  `;

  return (
    <Box containerCustomStyle={containerCustomStyle} icon="default">
      {props.children}
    </Box>
  );
}

Info.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Warning(props) {
  const containerCustomStyle = css`
    border-color: ${colors.light.iconWarning};
    background-color: ${colors.light.surfaceWarning};
  `;

  return (
    <Box containerCustomStyle={containerCustomStyle} icon="warning">
      {props.children}
    </Box>
  );
}

Warning.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Error(props) {
  const containerCustomStyle = css`
    border-color: ${colors.light.iconError};
    background-color: ${colors.light.surfaceError};
  `;

  return (
    <Box containerCustomStyle={containerCustomStyle} icon="error">
      {props.children}
    </Box>
  );
}

Error.propTypes = {
  children: PropTypes.node.isRequired,
};
