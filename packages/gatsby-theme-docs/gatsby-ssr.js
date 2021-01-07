/* eslint-disable import/prefer-default-export */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { withPrefix } from 'gatsby';
import { createContentDigest } from 'gatsby-core-utils';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import { createDocsCache, docsCacheKey } from './utils/create-emotion-cache';

const iconDarkDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-dark-32x32.png'))
);
const iconLightDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-light-32x32.png'))
);

/**
 * Matches different combinations of the lobotomized owl selector.
 * Examples:
 *   > * + *
 *   > h1 + *
 *   > h2 + *
 *   > * + h1
 *
 * Additionally, whitespaces are ignored.
 */
const lobotomizedOwlSelectorRegex = />\s*(\*|\w+)\s*\+\s*(\*|\w+)/g;
const patchedLobotomizedOwlSelector = '> $1:not(style) ~ $2:not(style)';

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  // https://emotion.sh/docs/ssr#on-server
  // https://emotion.sh/docs/ssr#gatsby
  const cache = createDocsCache();
  const { extractCritical } = createEmotionServer(cache);
  const { html, css, ids } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  );

  const patchedHtml = html
    // https://emmenko.medium.com/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
    .replace(lobotomizedOwlSelectorRegex, patchedLobotomizedOwlSelector);
  const patchedCss = css
    // https://emmenko.medium.com/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
    .replace(lobotomizedOwlSelectorRegex, patchedLobotomizedOwlSelector);

  replaceBodyHTMLString(patchedHtml);
  setHeadComponents([
    <link
      key="favicon-dark"
      rel="icon"
      href={withPrefix(`favicon-dark-32x32.png?v=${iconDarkDigest}`)}
      media="(prefers-color-scheme:light)"
    />,
    <link
      key="favicon-light"
      rel="icon"
      href={withPrefix(`favicon-light-32x32.png?v=${iconLightDigest}`)}
      media="(prefers-color-scheme:dark)"
    />,
    <style
      key="emotion-ssr"
      data-emotion={`${docsCacheKey} ${ids.join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: patchedCss,
      }}
    />,
  ]);
};
