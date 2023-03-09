import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import Link from './link';

const getStyles = (props) => {
  const baseStyles = css`
    border-radius: ${designSystem.tokens.borderRadiusForBetaFlag};
    color: ${designSystem.colors.light.textInfo};
    padding: 2px ${designSystem.dimensions.spacings.xs};
    font-size: ${designSystem.typography.relativeFontSizes.ultraSmall};
    vertical-align: middle;
  `;
  if (props.href) {
    return css`
      ${baseStyles}
      background-color: ${designSystem.colors.light.surfacePrimary};
      border: 1px solid ${designSystem.colors.light.borderInfo};
      box-shadow: ${designSystem.tokens.shadowForBetaFlag};
      color: ${designSystem.colors.light.textInfo} !important;

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
  `;
};

const betaHint =
  'This feature is marked as beta and is subject to change. Use with caution.';

const BetaFlag = (props) => {
  if (props.href) {
    return (
      <Link href={props.href} nounderline={true} css={getStyles(props)}>
        {'BETA'}
      </Link>
    );
  }
  return (
    <span css={getStyles(props)} title={betaHint}>
      {'BETA'}
    </span>
  );
};
BetaFlag.propTypes = {
  href: PropTypes.string,
};

export default BetaFlag;
