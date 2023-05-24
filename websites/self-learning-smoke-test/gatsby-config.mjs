import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const config = {
  flags: {
    DEV_SSR: true,
  },
  pathPrefix: '/self-learning-smoke-test',
  siteMetadata: {
    title: 'Self-learning Smoke Test',
    description: 'Self-learning website for smoke tests',
    betaLink: '/beta',
    excludeFromSearchIndex: true,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'self-learning-smoke-test',
      addOns: [
        {
          resolve: '@commercetools-docs/gatsby-theme-learning',
          options: {
            auth0Domain: 'commercetools-professionals.eu.auth0.com',
            learnApiBaseUrl: 'https://learning-api-git-ga-delete-test-user-commercetools.vercel.app',
            features: ['status-indicator', 'complete-profile-modal'],
          },
        },
        {
          resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
          options: {
            auth0Domain: 'commercetools-professionals.eu.auth0.com',
            auth0ClientId: 'nZwQWPaoTq8IIk67VV8o0Ska9lGp4hnW',
            learnApiBaseUrl: 'https://learning-api-git-ga-delete-test-user-commercetools.vercel.app',
          },
        },
      ],
    }),
  ],
};

export default config;
