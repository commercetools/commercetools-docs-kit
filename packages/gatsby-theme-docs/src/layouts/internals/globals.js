import React from 'react';
import { css, Global } from '@emotion/core';
import { colors, dimensions, typography, tokens } from '../../design-system';

// eslint-disable-next-line react/display-name
const Globals = () => (
  <Global
    styles={css`
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

      .section-h4,
      .section-h5 {
        padding: 0 0 0 ${dimensions.spacings.l};
      }

      /* Images */

      .gatsby-resp-image-wrapper {
        background-color: ${colors.light.surfaceSecondary1};
        border-radius: ${tokens.borderRadius6};
        margin: ${dimensions.spacings.m} 0;
        padding: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-figure {
        background-color: ${colors.light.surfaceSecondary1};
        border-radius: ${tokens.borderRadius6};
        margin: 0;
        padding: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-link {
        text-decoration: none;
      }
      .gatsby-resp-image-image {
        background-color: ${colors.light.surfacePrimary};
        box-shadow: none !important;
        width: calc(100% - ${dimensions.spacings.s} * 2);
        height: auto;
        margin: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-figure .gatsby-resp-image-wrapper {
        background-color: unset;
        border-radius: unset;
        margin: unset;
        padding: unset;
      }
      .gatsby-resp-image-figure .gatsby-resp-image-image {
        width: 100%;
        height: unset;
        margin: unset;
      }
      .gatsby-resp-image-figcaption {
        color: ${colors.light.textSecondary};
        font-size: ${typography.fontSizes.small};
        margin: ${dimensions.spacings.xs} 0 0;
      }

      /* Code blocks syntax highlighting */

      .gatsby-highlight {
        background-color: ${colors.light.surfaceCode};
        margin: 0;
        padding: ${dimensions.spacings.s} ${dimensions.spacings.xs}
          ${dimensions.spacings.s} ${dimensions.spacings.m};
        overflow: auto;
      }
      .gatsby-highlight > code,
      .gatsby-highlight code[class*='language-'],
      .gatsby-highlight pre[class*='language-'] {
        font-family: ${typography.fontFamilies.code};
        font-size: ${typography.fontSizes.small};
      }
      .gatsby-highlight pre[class*='language-'] {
        background-color: ${colors.light.surfaceCode};
        margin: 0;
        padding: 0;
        width: 100%;
      }
      .gatsby-highlight pre[class*='language-'],
      .gatsby-highlight code[class*='language-'] {
        white-space: pre-wrap;
      }
      .gatsby-highlight .gatsby-highlight-code-line {
        background-color: ${colors.light.surfaceCodeHighlight};
        width: 100%;
        display: inline-block;
      }
      .gatsby-highlight .gatsby-highlight-code-prompt {
        display: inline-block;
        margin: 0 0 0 ${dimensions.spacings.m};
      }
      .gatsby-highlight .gatsby-highlight-code-prompt::before {
        content: attr(data-prompt);
        margin: 0 0 0 -${dimensions.spacings.m};
        padding: 0 ${dimensions.spacings.s} 0 0;
        color: ${colors.light.surfaceSecondary3};
      }
      .gatsby-highlight
        .gatsby-highlight-code-prompt
        .gatsby-highlight-code-line {
        display: unset;
      }

      /* Resets */
      code,
      kbd,
      samp,
      pre {
        font-family: ${typography.fontFamilies.code}, 'Menlo', 'Monaco',
          'Consolas', 'Liberation Mono', 'Courier New', monospace;
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
    `}
  />
);
export default Globals;
