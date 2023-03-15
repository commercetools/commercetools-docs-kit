import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
  },
  pathPrefix: '/documentation',
  siteMetadata: {
    title: 'Docs Kit Docs',
    description: '',
    betaLink: '/beta',
    excludeFromSearchIndex: true,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'documentation',
      additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        {
          resolve: '@commercetools-docs/gatsby-theme-sso-ui-kit',
          options: {
            auth0Domain: 'auth.id.commercetools.com',
            auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
            learnApiBaseUrl: 'https://api.learn.commercetools.com',
          },
        },
      ],
    }),
  ],
};

export default config;
