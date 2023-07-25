import React from 'react';
import { css, Global } from '@emotion/react';
import { colors, dimensions, typography, tokens } from '../design-system';

type TGlobalsProps = {
  websitePrimaryColor: string;
};

const Globals = (props: TGlobalsProps) => (
  <Global
    styles={css`
      :root {
        --website-primary-color: ${props.websitePrimaryColor};
      }

      html,
      body {
        padding: 0;
        margin: 0;
        height: 100vh;
        color: ${colors.light.textPrimary};
        font-family: ${typography.fontFamilies.primary};
        font-size: ${typography.rootFontSize};
        font-weight: ${typography.fontWeights.regular};
      }

      iframe {
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
      }

      [data-reach-skip-link]:focus {
        z-index: 100;
      }

      /* Images */

      .gatsby-resp-image-wrapper {
        background-color: ${colors.light.surfaceSecondary1};
        border-radius: ${tokens.borderRadiusForImageFrame};
        margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.xxl}; /* for when not wrapped into a figure with caption */
        padding: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-figure {
        background-color: ${colors.light.surfaceSecondary1};
        border-radius: ${tokens.borderRadiusForImageFrame};
        margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.xxl}; /* margin for when wrapped into a figure with caption */
        padding: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-link {
        text-decoration: none;
      }
      .gatsby-resp-image-image {
        background-color: ${colors.light.surfacePrimary};
        box-shadow: none !important;
        width: calc(100% - ${dimensions.spacings.s} * 2) !important;
        height: auto !important;
        margin: ${dimensions.spacings.s} !important;
      }
      .gatsby-resp-image-figure .gatsby-resp-image-wrapper {
        background-color: unset;
        border-radius: unset;
        margin: unset; /* no duplication margin */
        padding: unset;
      }
      .gatsby-resp-image-figure .gatsby-resp-image-image {
        width: 100% !important;
        height: unset !important;
        margin: unset !important;
      }
      .gatsby-resp-image-figcaption {
        color: ${colors.light.textSecondary};
        font-size: ${typography.fontSizes.small};
        margin: ${dimensions.spacings.xs} 0 0;
      }

      /* Resets */
      code,
      kbd,
      samp,
      pre {
        font-family: ${typography.fontFamilies.stringLiteral}, 'Menlo', 'Monaco',
          'Consolas', 'Liberation Mono', 'Courier New', monospace;
        font-feature-settings: 'salt', 'ss02';
        font-size: ${typography.fontSizes.small};
      }
      b,
      strong {
        font-weight: ${typography.fontWeights.bold};
      }
      small {
        font-size: ${typography.fontSizes.small};
      }
      sub,
      sup {
        font-size: ${typography.fontSizes.extraSmall};
        line-height: 0;
        position: relative;
      }
      ul,
      ol {
        list-style-position: outside;
        padding-inline-start: 0;
        -webkit-padding-start: 0;
      }
    `}
  />
);

export default Globals;
