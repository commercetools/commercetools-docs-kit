/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import '@commercetools-docs/ui-kit/code-block-themes';
import React from 'react';
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
    require.ensure(['@sentry/browser'], require => {
      const Sentry = require('@sentry/browser');
      Sentry.init({
        dsn: 'https://e43538aae75e412eb16b27d8011f5a8b@sentry.io/1819068',
        release: commitSha,
        environment: `${environment}-${pluginOptions.websiteKey}`,
        whitelistUrls: ['docs.commercetools.com', 'now.sh'],
      });
    });
  }
};

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={docsCache}>{element}</CacheProvider>
);
