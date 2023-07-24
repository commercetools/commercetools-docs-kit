import PropTypes from 'prop-types';
import Link from './link';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';

const getStyles = (props) => {
  let tagBgColor; // tag background color;
  let tagFgColor; // tag foreground elements color (text/icon/borders)
  switch (props.color) {
    case 'green':
      break;
    default:
      tagBgColor = designSystem.colors.light.surfaceBeta;
      tagFgColor = designSystem.colors.light.textInfo;
      break;
  }

  const baseStyles = css`
    border-radius: ${designSystem.tokens.borderRadiusForBetaFlag};
    color: ${tagFgColor};
    padding: 2px ${designSystem.dimensions.spacings.xs};
    font-size: ${designSystem.typography.relativeFontSizes.ultraSmall};
    vertical-align: middle;
  `;
  if (props.size === 'large') {
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
  // if (props.href) {
  //   return css`
  //     ${baseStyles}
  //     background-color: ${designSystem.colors.light.surfacePrimary};
  //     border: 1px solid ${designSystem.colors.light.borderInfo};
  //     box-shadow: ${designSystem.tokens.shadowForBetaFlag};
  //     color: ${designSystem.colors.light.textInfo} !important;

  //     :active,
  //     :focus,
  //     :hover {
  //       background-color: ${designSystem.colors.light.textInfo};
  //       box-shadow: none;
  //       color: ${designSystem.colors.light.textInverted} !important;
  //     }
  //   `;
  // }
  return css`
    ${baseStyles}
    background-color: ${tagBgColor};
  `;
};

export const PlanTag = (props) => {
  if (props.href) {
    return (
      <Link href={props.href} nounderline={true} css={getStyles(props)}>
        {props.text}
      </Link>
    );
  }
  return (
    <span css={getStyles(props)} title={props.overHint}>
      {props.text}
    </span>
  );
};

PlanTag.propTypes = {
  href: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  icon: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  overHint: PropTypes.string,
  text: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.string, // defaults to small, it can be "small" or "large"
};
