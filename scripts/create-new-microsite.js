#!/usr/bin/env node

const fs = require('fs');
const prompts = require('prompts');

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'micrositeName',
    message: 'What is the name of the new microsite?',
    validate: (micrositeName) =>
      micrositeName.length > 64 ? `Microsite name is too long.` : true,
  });

  const formattedMicrositeName = response.micrositeName
    .replace(/\s+/g, '-')
    .toLowerCase();
  const micrositeTitle =
    response.micrositeName.replace(/-/g, ' ').charAt(0).toUpperCase() +
    response.micrositeName.slice(1);

  const gatsbyConfigTemplate = `import { configureThemeWithAddOns } from '@commercetools-docs/gatsby-theme-docs/configure-theme.mjs';

const isProd = process.env.NODE_ENV === 'production';
const shouldEnableSearch = process.env.ENABLE_SEARCH === 'true';

const config = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/${formattedMicrositeName}',
  siteMetadata: {
    title: '${micrositeTitle}',
    description: 'CHANGE DESCRIPTION HERE',
    products: ['smokeTest'],
    contentType: 'test',
    breadcrumbs: '',
    betaLink: '/beta',
    excludeFromSearchIndex: isProd && !shouldEnableSearch,
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: '${formattedMicrositeName}',
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

`;

  const websitesFolderPath = `${process.cwd()}/websites`;

  // Using the site template to create the new microsite folder
  fs.cpSync(
    `${websitesFolderPath}/site-template`,
    `${websitesFolderPath}/${formattedMicrositeName}`,
    { recursive: true }
  );

  // Overriding the gatsby config with the given microsite name
  fs.writeFileSync(
    `${websitesFolderPath}/${formattedMicrositeName}/gatsby-config.mjs`,
    gatsbyConfigTemplate
  );

  // Overriding the package.json file with the given microsite name
  const packageJson = JSON.parse(
    fs.readFileSync(
      `${websitesFolderPath}/${formattedMicrositeName}/package.json`
    )
  );
  packageJson.name = `@commercetools-website/${formattedMicrositeName}`;
  fs.writeFileSync(
    `${websitesFolderPath}/${formattedMicrositeName}/package.json`,
    JSON.stringify(packageJson)
  );

  // Creating a fresh CHANGELOG
  fs.writeFileSync(
    `${websitesFolderPath}/${formattedMicrositeName}/CHANGELOG.md`,
    ''
  );
})();
