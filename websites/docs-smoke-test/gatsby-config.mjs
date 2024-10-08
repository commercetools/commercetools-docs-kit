import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';

const config = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/docs-smoke-test',
  siteMetadata: {
    title: 'Docs Smoke Test',
    description: 'Documentation website for smoke tests',
    products: ['smokeTest'],
    contentType: 'test',
    breadcrumbs: 'Test Sites',
    betaLink: '/beta',
    excludeFromSearchIndex: isProd && !shouldEnableSearch,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'docs-smoke-test',
      auth0Domain: 'auth.id.commercetools.com',
      auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
      learnApiBaseUrl: 'https://learning-api.commercetools.vercel.app',
      aiAssistantApiBaseUrl: 'https://assistant-api.commercetools.vercel.app',
      aiAssistantTopbarButton: true,
      hideLogin: true,
      selfLearningFeatures: ['complete-profile-modal'],
      additionalPrismLanguages: [
        'markup-templating',
        'json',
        'bash',
        'java',
        'scala',
        'csharp',
        'swift',
        'php',
      ],
      addOns: [
        '@commercetools-docs/gatsby-theme-code-examples',
        '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};

export default config;
