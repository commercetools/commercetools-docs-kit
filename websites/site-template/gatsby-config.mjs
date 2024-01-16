import {
  configureThemeWithAddOns,
}  from "@commercetools-docs/gatsby-theme-docs/configure-theme.mjs";
const isProd = process.env.NODE_ENV === 'production';



const config = {
  flags: {
    FAST_DEV: true,
  },
  pathPrefix: '/site-template',
  siteMetadata: {
    title: 'CHANGE-ME',
    description: 'CHANGE-ME',
    breadcrumbs: 'CHANGE-ME',
    betaLink: '',
    excludeFromSearchIndex: isProd,
    allowWideContentLayout: true,
    products: ['CHANGE-ME'],
    contentType: 'CHANGE-ME',
  },
  plugins: [
    ...configureThemeWithAddOns({
      websiteKey: 'CHANGE-ME',
      // additionalPrismLanguages: ['java', 'scala', 'csharp', 'swift', 'php'],
      addOns: [
        // '@commercetools-docs/gatsby-theme-code-examples',
        // '@commercetools-docs/gatsby-theme-api-docs'
        // '@commercetools-docs/gatsby-theme-constants',
      ],
    }),
  ],
};

export default config;
