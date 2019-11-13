/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setPostBodyComponents }) => {
  // Activate the cookie consent banner only on the live website environment.
  // We can narrow it down to the build step of Zeit Now for the master branch.
  if (
    process.env.NODE_ENV === 'production' &&
    Boolean(process.env.NOW_GITHUB_DEPLOYMENT) &&
    process.env.NOW_GITHUB_COMMIT_REF === 'master'
  )
    setPostBodyComponents([
      <script
        key="cookie-consent"
        type="text/javascript"
        src="https://cdn.cookielaw.org/langswitch/99bb6fae-765a-4fc5-9b6e-8c89a353335d.js"
        onLoad="function OptanonWrapper() {};"
      />,
    ]);
};
