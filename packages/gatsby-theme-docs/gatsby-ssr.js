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
import createEmotionServer from 'create-emotion-server';
import { CacheProvider } from '@emotion/core';
import { createDocsCache } from './create-emotion-cache';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const isNowBuild = Boolean(process.env.GATSBY_NOW_GITHUB_DEPLOYMENT);
const isMasterBranch = process.env.GATSBY_NOW_GITHUB_COMMIT_REF === 'master';

const iconDarkDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-dark-32x32.png'))
);
const iconLightDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-light-32x32.png'))
);

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
  setPostBodyComponents,
}) => {
  // https://emotion.sh/docs/ssr#on-server
  // https://emotion.sh/docs/ssr#gatsby
  const cache = createDocsCache();
  const { extractCritical } = createEmotionServer(cache);
  const { html, css, ids } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  );
  const patchedHtml = html
    // There is a known issue with Emotion and SSR in case elements use
    // nth child selectors, like the Lobotomized Owl (`* + *`).
    // This causes a FOUC effect (Flash Of Unstyled Content), where the injected
    // inline <style> element disrupts the CSS selector until it gets removed
    // upon hydration on the client side.
    // https://github.com/emotion-js/emotion/issues/1178
    // Until this issue is solved, we need to find a way to exclude the <style>
    // element to affect the styles of the CSS selector.
    // I found the following modified Lobotomized Owl selector to work.
    // It uses the "general sibling selector (~)" instead of the "adjacent sibling
    // selector (+)" together with the `:not` psuedo-class to exclude the `style` elements.
    // The "hack" is to replace all the normal Lobotomized Owl selector with
    // the new one.
    .replace(/> \* \+ \*/g, '> *:not(style) ~ *:not(style)');
  replaceBodyHTMLString(patchedHtml);

  // Activate the cookie consent banner only on the live website environment.
  // We can narrow it down to the build step of Zeit Now for the master branch.
  // That still not catches all cases, it's hidden client-side if not on a .commercetools.com domain
  if (isProduction && isNowBuild && isMasterBranch)
    setPostBodyComponents([
      <script
        key="cookie-consent-part1"
        type="text/javascript"
        defer
        src="https://cdn.cookielaw.org/consent/b104027d-4d10-4b75-9675-9ffef11562a8/OtAutoBlock.js"
      />,
      <script
        key="cookie-consent-part2"
        type="text/javascript"
        defer
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        data-domain-script="b104027d-4d10-4b75-9675-9ffef11562a8"
        onLoad="function OptanonWrapper() {};"
      />,
    ]);

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
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />,
    <style
      key="optanon-killer"
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: `
          body.not-on-cookie-domain #onetrust-consent-sdk,
          body.not-on-cookie-domain #onetrust-consent-sdk .onetrust-pc-dark-filter {
            display: none !important;
          }`,
      }}
    />,
  ]);
};
