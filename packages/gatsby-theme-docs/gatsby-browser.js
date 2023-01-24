/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import Prism from 'prism-react-renderer/prism';
import { Auth0Provider } from '@auth0/auth0-react';
import { CacheProvider } from '@emotion/react';
import { SWRConfig } from 'swr';
import { docsCache } from './utils/create-emotion-cache';
import { PortalsContainer } from '@commercetools-docs/ui-kit';
import * as Sentry from '@sentry/browser';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/roboto-mono/latin-400.css';
import '@fontsource/roboto-mono/latin-500.css';
import '@fontsource/roboto-mono/latin-700.css';
import './globals.css';
import ConfigContext from './src/components/config-context';
import { LearningStateProvider } from './src/modules/self-learning/components/learning-context';

const isProduction = process.env.GATSBY_NODE_ENV === 'production';
const commitSha = process.env.GATSBY_VERCEL_GITHUB_COMMIT_SHA;

// Focus `main` container for keyboard accessibility purposes.
// This is apparently required in browsers such as Firefox or Safari.
// In Chrome, it seems that the `autofocus` attribute is enough.
// For more advanced uses cases, we might want to look into Gatsby's recommendations
// of using `@react/skip-nav`:
// * https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements/
// * https://github.com/gatsbyjs/gatsby/tree/master/examples/using-reach-skip-nav
const focusMainContent = () => {
  if (document) {
    const elem = document.querySelector('main');
    if (elem) {
      elem.focus();
    }
  }
};

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

export const onClientEntry = async (
  _, // eslint-disable-line
  pluginOptions
) => {
  if (isProduction) {
    Sentry.init({
      dsn: 'https://e43538aae75e412eb16b27d8011f5a8b@o32365.ingest.sentry.io/1819068',
      release: commitSha,
      environment: pluginOptions.websiteKey,
      allowUrls: ['docs.commercetools.com', 'commercetools.vercel.app'],
    });

    if (typeof IntersectionObserver === 'undefined') {
      await import('intersection-observer');
    }
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
  const additionalPrismLanguages = pluginOptions.additionalPrismLanguages || [];
  // Use a for-loop to run dynamic imports sequentially.
  for (let index = 0; index < additionalPrismLanguages.length; index++) {
    const lang = additionalPrismLanguages[index];
    await import(`prismjs/components/prism-${lang}`);
  }
  delete window.Prism;

  focusMainContent();
};

const onRedirectCallback = (appState) => {
  window.location.replace(appState.returnTo);
};

export const wrapRootElement = ({ element }, pluginOptions) => {
  const isSSOEnabled = pluginOptions.auth0Domain && pluginOptions.auth0ClientId;
  const audience =
    isSSOEnabled && pluginOptions.auth0Domain === 'auth.id.commercetools.com'
      ? 'commercetools.eu.auth0.com'
      : pluginOptions.auth0Domain;
  return (
    <CacheProvider value={docsCache}>
      <ConfigContext.Provider
        value={{
          learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
          auth0Domain: pluginOptions.auth0Domain,
          auth0ClientId: pluginOptions.auth0ClientId,
          selfLearningFeatures: pluginOptions?.selfLearningFeatures || [],
          hideLogin: pluginOptions?.hideLogin || false,
        }}
      >
        {isSSOEnabled ? (
          <Auth0Provider
            domain={pluginOptions.auth0Domain}
            clientId={pluginOptions.auth0ClientId}
            onRedirectCallback={onRedirectCallback}
            authorizationParams={{
              redirect_uri: window.location.origin,
              audience: `https://${audience}/api/v2/`,
              scope: 'profile email',
            }}
          >
            <LearningStateProvider>
              <SWRConfig>{element}</SWRConfig>
            </LearningStateProvider>
          </Auth0Provider>
        ) : (
          <LearningStateProvider>
            <SWRConfig>{element}</SWRConfig>
          </LearningStateProvider>
        )}
      </ConfigContext.Provider>
    </CacheProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <PortalsContainer />
      {element}
    </>
  );
};

export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation !== null) {
    focusMainContent();
  }
};
