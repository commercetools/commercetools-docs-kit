/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'typeface-roboto';
import 'typeface-roboto-mono';
import React from 'react';
import Prism from 'prism-react-renderer/prism';
import { CacheProvider } from '@emotion/core';
import { docsCache } from './utils/create-emotion-cache';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const commitSha = process.env.GATSBY_VERCEL_GITHUB_COMMIT_SHA;

const injectScript = (url, attributes = {}, onLoad) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  Object.keys(attributes).forEach((key) => {
    script.setAttribute(key, attributes[key]);
  });
  if (onLoad) script.onload = onLoad;
  document.body.appendChild(script);
};

export const onClientEntry = (
  _, // eslint-disable-line
  pluginOptions
) => {
  if (isProduction) {
    require.ensure(['@sentry/browser'], (require) => {
      const Sentry = require('@sentry/browser');
      Sentry.init({
        dsn: 'https://e43538aae75e412eb16b27d8011f5a8b@o32365.ingest.sentry.io/1819068',
        release: commitSha,
        environment: pluginOptions.websiteKey,
        allowUrls: ['docs.commercetools.com', 'now.sh', 'vercel.app'],
      });
    });
  }
  // Inject the cookie consent scripts only if the page is served on the domain `*.commercetools.com`.
  if (window && window.location.host.includes('.commercetools.com')) {
    injectScript(
      'https://cdn.cookielaw.org/consent/b104027d-4d10-4b75-9675-9ffef11562a8/OtAutoBlock.js'
    );
    injectScript(
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      { 'data-domain-script': 'b104027d-4d10-4b75-9675-9ffef11562a8' },
      'function OptanonWrapper() {};'
    );
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
