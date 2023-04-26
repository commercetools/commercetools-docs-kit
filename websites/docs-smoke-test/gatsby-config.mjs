import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';

const config = {
  flags: {
    DEV_SSR: true,
  },
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    betaLink: '/beta',
    excludeFromSearchIndex: isProd && !shouldEnableSearch,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'docs-smoke-test',
      additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        '@commercetools-docs/gatsby-theme-constants',
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
