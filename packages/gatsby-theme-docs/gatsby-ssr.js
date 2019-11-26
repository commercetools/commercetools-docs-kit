/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import fs from 'fs';
import { withPrefix } from 'gatsby';
import { createContentDigest } from 'gatsby-core-utils';
import React from 'react';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const isNowBuild = Boolean(process.env.GATSBY_NOW_GITHUB_DEPLOYMENT);
const isMasterBranch = process.env.GATSBY_NOW_GITHUB_COMMIT_REF === 'master';

const iconDarkDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-dark.png'))
);
const iconLightDigest = createContentDigest(
  fs.readFileSync(require.resolve('./static/favicon-light.png'))
);

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  // Activate the cookie consent banner only on the live website environment.
  // We can narrow it down to the build step of Zeit Now for the master branch.
  if (isProduction && isNowBuild && isMasterBranch)
    setPostBodyComponents([
      <script
        key="cookie-consent"
        type="text/javascript"
        src="https://cdn.cookielaw.org/langswitch/99bb6fae-765a-4fc5-9b6e-8c89a353335d.js"
        onLoad="function OptanonWrapper() {};"
      />,
    ]);

  setHeadComponents([
    <link
      key="favicon-dark"
      rel="icon"
      href={withPrefix(`favicon-dark.png?v=${iconDarkDigest}`)}
      media="(prefers-color-scheme:light)"
    />,
    <link
      key="favicon-light"
      rel="icon"
      href={withPrefix(`favicon-light.png?v=${iconLightDigest}`)}
      media="(prefers-color-scheme:dark)"
    />,
  ]);
};
