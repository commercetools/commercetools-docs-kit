/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const isNowBuild = Boolean(process.env.GATSBY_NOW_GITHUB_DEPLOYMENT);
const isMasterBranch = process.env.GATSBY_NOW_GITHUB_COMMIT_REF === 'master';

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setPostBodyComponents }) => {
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
};
