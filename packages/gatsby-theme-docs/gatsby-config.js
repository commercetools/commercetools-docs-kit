/* eslint-disable global-require */

const path = require('path');

// Proxy env variables needed for `gatsby-browser.js` and `gatsby-ssr.js`.
// https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript
const proxyEnvironmentVariables = [
  'NODE_ENV',
  'NOW_GITHUB_DEPLOYMENT',
  'NOW_GITHUB_COMMIT_SHA',
  'NOW_GITHUB_COMMIT_REF',
];
proxyEnvironmentVariables.forEach(envName => {
  process.env[`GATSBY_${envName}`] = process.env[envName];
});

const defaultOptions = {
  websiteKey: '',
  gaTrackingId: undefined,
  createNodeSlug: undefined,
};
const requiredOptions = ['websiteKey'];

const validateThemeOptions = options => {
  requiredOptions.forEach(option => {
    if (!options[option]) {
      throw new Error(`Missing required value for option ${option}.`);
    }
  });
};

module.exports = (themeOptions = {}) => {
  const pluginOptions = { ...defaultOptions, ...themeOptions };
  validateThemeOptions(pluginOptions);

  return {
    siteMetadata: {
      author: 'commercetools',
      productionHostname: 'docs.commercetools.com',
    },
    plugins: [
      /**
       *  Sources for loading content
       */

      /*
      gatsby-source-filesystem notes:
      https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=file#how-to-query
      Most of these files get queried through other transformers,
      but the `name` property here allows filtering allFile queries:
      allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
        edges {
          node { etc...
    */
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'srcImages',
          path: path.resolve(`./src/images`),
        },
      },
      // Data files (.yaml)
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'configurationData',
          path: path.resolve(`./src/data`),
        },
      },
      // Assets (e.g. images) used from the markdown pages
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'images',
          path: path.resolve(`./src/images`),
        },
      },
      // Main content pages (.mdx)
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'content',
          path: path.resolve(`./src/content`),
        },
      },

      /**
       * Transformers for making content available in graphql queries
       */

      // For querying images
      'gatsby-transformer-sharp',

      // For querying configuration data
      'gatsby-transformer-yaml',

      // For querying MDX
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: [
            '.mdx',
            // ".md"
          ],
          // List of remark plugins, that transform the markdown AST.
          remarkPlugins: [require('remark-emoji')],
          // List of rehype plugins, that transform the HTML AST.
          rehypePlugins: [
            require('rehype-slug'),
            require('./src/plugins/rehype-mdx-section'),
          ],
          gatsbyRemarkPlugins: [
            // Convert absolute image file paths to relative. Required for remark-images to work.
            // https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/?=gatsby-remark-relative-images
            // See options ^ For how to convert images from frontmatter if needed.
            'gatsby-remark-relative-images',
            {
              resolve: 'gatsby-remark-images',
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 770,
                showCaptions: ['title'],
              },
            },
            {
              resolve: 'gatsby-remark-copy-linked-files',
              options: {
                destinationDir: 'files',
              },
            },
            // 'gatsby-remark-rewrite-relative-links',
          ],
          // workaround https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
          plugins: ['gatsby-remark-images', 'gatsby-remark-copy-linked-files'],
        },
      },

      /**
       * Plugins for general functionality
       */
      'gatsby-plugin-sharp',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-emotion',
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: /icons/,
          },
        },
      },
      {
        resolve: 'gatsby-plugin-prefetch-google-fonts',
        options: {
          fonts: [
            { family: 'Roboto', variants: ['400', '400i', '500', '700'] },
            { family: 'Roboto Mono', variants: ['400', '500'] },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          icon: require.resolve('./src/icons/logo.png'),
        },
      },
      pluginOptions.gaTrackingId && {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: pluginOptions.gaTrackingId,
          head: false,
          anonymize: true,
          respectDNT: false,
          exclude: [],
        },
      },
      // This needs to be last
      // 'gatsby-plugin-offline', // TODO: decide if we want to use it or not
      'gatsby-plugin-remove-trailing-slashes',
      'gatsby-plugin-meta-redirect',
      'gatsby-plugin-netlify-cache',
    ].filter(Boolean),
  };
};
