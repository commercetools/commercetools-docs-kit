import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ClassNames } from '@emotion/core';

import UnstyledInformationIcon from '../icons/information-icon.svg';
import UnstyledWarningIcon from '../icons/warning.svg';
import UnstyledErrorIcon from '../icons/error.svg';
import createStyledIcon from '../utils/create-styled-icon';
import markdown2React from '../utils/markdown-2-react';
import { colors, tokens, dimensions } from '../design-system';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: ${dimensions.spacings.m};
  margin: ${dimensions.spacings.s} 0;
  border: 1px solid;
  border-radius: ${tokens.borderRadius6};
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${dimensions.widths.icon};
  height: ${dimensions.heights.icon};
`;

const InfoTextWrapper = styled.div`
  margin-left: ${dimensions.spacings.s};
`;

function Box(props) {
  return (
    <Container className={props.className}>
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
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function Info(props) {
  return (
    <ClassNames>
      {({ css }) => (
        <Box
          className={css`
            border-color: ${colors.light.borderInfo};
            background-color: ${colors.light.surfaceInfo2};
          `}
        >
          {props.children}
        </Box>
      )}
    </ClassNames>
  );
}

Info.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Warning(props) {
  return (
    <ClassNames>
      {({ css }) => (
        <Box
          className={css`
            border-color: ${colors.light.iconWarning};
            background-color: ${colors.light.surfaceWarning};
          `}
          icon="warning"
        >
          {props.children}
        </Box>
      )}
    </ClassNames>
  );
}

Warning.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Error(props) {
  return (
    <ClassNames>
      {({ css }) => (
        <Box
          className={css`
            border-color: ${colors.light.iconError};
            background-color: ${colors.light.surfaceError};
          `}
          icon="error"
        >
          {props.children}
        </Box>
      )}
    </ClassNames>
  );
}

Error.propTypes = {
  children: PropTypes.node.isRequired,
};
