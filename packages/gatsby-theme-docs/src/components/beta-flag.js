import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';

const getStyles = props => {
  const baseStyles = css`
    border-radius: ${designSystem.tokens.borderRadius4};
    color: ${designSystem.colors.light.textInfo};
    padding: 2px ${designSystem.dimensions.spacings.xs};
  `;
  if (props.href) {
    return css`
      ${baseStyles}
      background-color: ${designSystem.colors.light.surfacePrimary};
      border: 1px solid ${designSystem.colors.light.borderInfo};
      box-shadow: ${designSystem.tokens.shadow7};
      color: ${designSystem.colors.light.textInfo} !important;
      font-size: ${designSystem.typography.fontSizes.small};
      text-decoration: none;

      :active,
      :focus,
      :hover {
        background-color: ${designSystem.colors.light.textInfo};
        box-shadow: none;
        color: ${designSystem.colors.light.textInverted} !important;
      }
    `;
  }
  return css`
    ${baseStyles}
    background-color: ${designSystem.colors.light.surfaceBeta};
    font-size: ${designSystem.typography.fontSizes.ultraSmall};
  `;
};

const BetaFlag = props => {
  if (props.href) {
    return (
      <Markdown.Link href={props.href} css={getStyles(props)}>
        {'BETA'}
      </Markdown.Link>
    );
  }
  return <span css={getStyles(props)}>{'BETA'}</span>;
};
BetaFlag.propTypes = {
  href: PropTypes.string,
};

export default BetaFlag;
