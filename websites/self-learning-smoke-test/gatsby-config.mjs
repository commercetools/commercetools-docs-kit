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
    breadcrumbs: 'Test Sites',
    betaLink: '/beta',
    isSelfLearning: true,
    products: ['smokeTest'],
    contentType: 'test',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'self-learning-smoke-test',
      auth0Domain: 'auth.id.commercetools.com',
      auth0ClientId: 'xLk8EDUCc8PKqCbrSJCnuahvn86nEn4z',
      learnApiBaseUrl: 'https://learning-api.commercetools.vercel.app',
      aiAssistantApiBaseUrl: 'https://assistant-api.commercetools.vercel.app',
      aiAssistantTopbarButton: true,
      selfLearningFeatures: [
        'status-indicator',
        'complete-profile-modal',
        'tabs-session-sync',
        'page-ready',
      ],
      hideLogin: false,
      addOns: [],
    }),
  ],
};

export default config;
