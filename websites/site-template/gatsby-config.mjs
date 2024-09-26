import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';

const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';

// Please update the config template in the create-new-microsite.js script when changing the config here.
// They should always be in sync.

const config = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    products: ['smokeTest'],
    contentType: 'test',
    breadcrumbs: 'CHANGE-ME',
    betaLink: '/beta',
    excludeFromSearchIndex: isProd && !shouldEnableSearch,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'site-template',
      auth0Domain: 'auth.id.commercetools.com',
      auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
      selfLearningFeatures: ['complete-profile-modal'],
      hideLogin: true,
      aiAssistantTopbarButton: true,
      aiAssistantApiBaseUrl: 'https://assistant-api.commercetools.vercel.app',
      learnApiBaseUrl:
        isProd === 'true'
          ? 'https://learning-api.docs.commercetools.com'
          : 'https://learning-api.commercetools.vercel.app',
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
    }),
  ],
};

export default config;
