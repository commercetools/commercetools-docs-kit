/* eslint-disable global-require */

const path = require('path');
const defaultOptions = require('./default-options');

// Proxy env variables needed for `gatsby-browser.js` and `gatsby-ssr.js`.
// https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript
const proxyEnvironmentVariables = [
  'NODE_ENV',
  'NOW_GITHUB_DEPLOYMENT',
  'NOW_GITHUB_COMMIT_SHA',
  'NOW_GITHUB_COMMIT_REF',
];
proxyEnvironmentVariables.forEach((envName) => {
  process.env[`GATSBY_${envName}`] = process.env[envName];
});

const requiredOptions = ['websiteKey'];
const validateThemeOptions = (options) => {
  requiredOptions.forEach((option) => {
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
      betaLink: null,
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

      // Default configuration data files (.yaml)
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'internalConfigurationData',
          path: path.join(__dirname, `./src/data`),
          ignore: pluginOptions.overrideDefaultConfigurationData,
        },
      },
      // Default content pages (.mdx)
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'internalContent',
          path: path.join(__dirname, `./src/content`),
        },
      },
      // Site provided configuration data files (.yaml)
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
      // Release notes
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'releaseNotes',
          path: path.resolve(`./src/releases`),
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
          // implement commonmark for stricter compatibility, e.g. backslash newlines
          commonmark: true,
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
          // We want to generate legacy "apple-touch" icons for the dark color icon.
          icon: require.resolve('./static/favicon-dark.png'),
          // Do not add the favicon, we do that on our own in `gatsby-ssr.js` in
          // order to support light/dark media queries.
          include_favicon: false,
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
      {
        resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
        options: {
          disable: process.env.ANALYZE_BUNDLE !== 'true',
        },
      },
      {
        resolve: 'gatsby-plugin-feed',
        options: {
          query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
          setup: ({
            query: {
              site: { siteMetadata },
            },
            ...rest
          }) => ({
            ...siteMetadata,
            ...rest,
            title: `commercetools ${siteMetadata.title} Release Notes`,
            language: 'en',
            categories: ['commercetools', 'e-commerce'],
          }),
          feeds: [
            {
              serialize: ({ query: { site, allReleaseNotePage } }) => {
                return allReleaseNotePage.nodes.map((node) => {
                  return {
                    ...node,
                    url: `${site.siteMetadata.siteUrl}${node.slug}`,
                    guid: `${site.siteMetadata.siteUrl}${node.slug}`,
                  };
                });
              },
              query: `
              {
                allReleaseNotePage(
                  limit: 5, sort: { order: DESC, fields: date }, filter: {date: {gt: "1999-01-01"}},
                ) {
                    nodes {
                      description
                      slug
                      title
                      date
                      categories: topics
                    }
                }
              }
            `,
              output: '/releases/feed.xml',
            },
          ],
        },
      },

      /**
       * The following plugins need to be last
       */
      'gatsby-plugin-remove-trailing-slashes',
      'gatsby-plugin-meta-redirect',
    ].filter(Boolean),
  };
};
