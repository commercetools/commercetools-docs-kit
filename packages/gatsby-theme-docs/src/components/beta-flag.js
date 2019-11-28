import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { colors, tokens, typography, dimensions } from '../design-system';
import Link from './link';

const getStyles = props => {
  const baseStyles = css`
    border-radius: ${tokens.borderRadius4};
    color: ${colors.light.textInfo};
    padding: 2px ${dimensions.spacings.xs};
  `;
  if (props.href) {
    return css`
      ${baseStyles}
      border: 1px solid ${colors.light.borderInfo};
      box-shadow: ${tokens.shadow7};
      font-size: ${typography.fontSizes.small};
      text-decoration: none;
      :hover {
        background-color: ${colors.light.textInfo};
        box-shadow: none;
        color: ${colors.light.textInverted};
      }
    `;
  }
  return css`
    ${baseStyles}
    background-color: ${colors.light.surfaceBeta};
    font-size: ${typography.fontSizes.ultraSmall};
  `;
};

const BetaFlag = props => {
  if (props.href) {
    return (
      <Link href={props.href} css={getStyles(props)}>
        {'BETA'}
      </Link>
    );
  }
  return <span css={getStyles(props)}>{'BETA'}</span>;
};
BetaFlag.propTypes = {
  href: PropTypes.string,
};

export default BetaFlag;
