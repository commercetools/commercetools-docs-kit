import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const config = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/documentation',
  siteMetadata: {
    title: 'Docs Kit Docs',
    description: '',
    products: ['docsKit'],
    contentType: 'userDocs',
    breadcrumbs: 'Documentation',
    betaLink: '/beta',
    excludeFromSearchIndex: true,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'documentation',
      auth0Domain: 'auth.id.commercetools.com',
      auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
      learnApiBaseUrl: 'https://learning-api.commercetools.vercel.app',
      aiAssistantApiBaseUrl: 'https://assistant-api.commercetools.vercel.app',
      aiAssistantTopbarButton: true,
      hideLogin: true,
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
      addOns: ['@commercetools-docs/gatsby-theme-code-examples'],
    }),
  ],
};

export default config;
