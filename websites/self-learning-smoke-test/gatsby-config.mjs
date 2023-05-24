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
            auth0Domain: 'auth.id.commercetools.com',
            learnApiBaseUrl: 'https://learning-api.commercetools.vercel.app',
            features: ['status-indicator', 'complete-profile-modal'],
          },
        },
        {
          resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
          options: {
            auth0Domain: 'auth.id.commercetools.com',
            auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
            learnApiBaseUrl: 'https://learning-api.commercetools.vercel.app',
          },
        },
      ],
    }),
  ],
};

export default config;
