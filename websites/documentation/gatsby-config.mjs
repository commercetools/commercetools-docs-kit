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
            auth0Domain: 'commercetools-professionals.eu.auth0.com',
            auth0ClientId: 'nZwQWPaoTq8IIk67VV8o0Ska9lGp4hnW',
            learnApiBaseUrl: 'https://learning-api-git-ga-delete-test-user-commercetools.vercel.app',
            hideLogin: false,
          },
        },
      ],
    }),
  ],
};

export default config;
