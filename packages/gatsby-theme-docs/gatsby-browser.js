/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import Prism from 'prism-react-renderer/prism';
import { CacheProvider } from '@emotion/core';
import { docsCache } from './create-emotion-cache';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const commitSha = process.env.GATSBY_NOW_GITHUB_COMMIT_SHA;
const environment =
  process.env.GATSBY_NOW_GITHUB_COMMIT_REF === 'master'
    ? 'production'
    : 'preview';

export const onClientEntry = (
  _, // eslint-disable-line
  pluginOptions
) => {
  if (isProduction) {
    require.ensure(['@sentry/browser'], (require) => {
      const Sentry = require('@sentry/browser');
      Sentry.init({
        dsn: 'https://e43538aae75e412eb16b27d8011f5a8b@sentry.io/1819068',
        release: commitSha,
        environment: `${environment}-${pluginOptions.websiteKey}`,
        whitelistUrls: ['docs.commercetools.com', 'now.sh'],
      });
    });
    if (window && !window.location.host.includes('.commercetools.com'))
      document.body.classList.add('not-on-cookie-domain');
  }

  // Require additional Prism languages.
  // Inspired by https://github.com/facebook/docusaurus/pull/2250.
  window.Prism = Prism;
  (pluginOptions.additionalPrismLanguages || []).forEach((lang) => {
    require(`prismjs/components/prism-${lang}`); // eslint-disable-line
  });
  delete window.Prism;
};

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={docsCache}>{element}</CacheProvider>
);
