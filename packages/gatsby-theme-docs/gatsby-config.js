/* eslint-disable global-require */

const path = require('path');
const defaultOptions = require('./utils/default-options');

const isProd = process.env.NODE_ENV === 'production';

// Proxy env variables needed for `gatsby-browser.js` and `gatsby-ssr.js`.
// https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript
const proxyEnvironmentVariables = ['NODE_ENV', 'VERCEL_GITHUB_COMMIT_SHA'];
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
const productionHostname = 'docs.commercetools.com';

module.exports = (themeOptions = {}) => {
  const pluginOptions = { ...defaultOptions, ...themeOptions };
  validateThemeOptions(pluginOptions);

  return {
    siteMetadata: {
      author: 'commercetools',
      productionHostname,
      betaLink: '.',
      globalNotification: {
        isActive: false,
        notificationType: 'info',
        content: '',
      },
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

      // Color presets
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'colorPresets',
          path: path.join(__dirname, `./color-presets`),
          ignore: ['**/*.md', '**/*.js'],
        },
      },
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
          // implement commonmark for stricter compatibility, e.g. backslash transformed to newlines
          commonmark: true,
          // List of remark plugins, that transform the markdown AST.
          remarkPlugins: [
            require('remark-emoji'),
            require('./src/plugins/remark-mdx-mermaid'),
          ],
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
                //
                // 754 is computed from
                // pageWidth size (770) found in ui-kit/src/design-system.js
                //   minus
                // Left and right padding from gatsby-resp-image-figure class
                //
                // 754 is also specified in ./src/hooks/use-resized-images.js
                // but cannot be reused from here because it has to be statically compiled into a GraphQL query.
                maxWidth: 754,
                loading: 'auto',
                // one resolution is enough for dev mode. 754 is generated anyways,
                // so using it in the breakpoints array prevents the plugin from falling
                // back to defaults when the array is empty.
                srcSetBreakpoints: isProd ? [754, 1508] : [754],
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
      pluginOptions.enableCanonicalUrls !== false && {
        resolve: 'gatsby-plugin-react-helmet-canonical-urls',
        options: {
          siteUrl: `https://${productionHostname}`,
          noTrailingSlash: true,
          noHash: true,
          noQueryString: true,
        },
      },
      'gatsby-plugin-emotion',
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
      pluginOptions.hubspotTrackingCode && {
        resolve: 'gatsby-plugin-hubspot',
        options: {
          trackingCode: pluginOptions.hubspotTrackingCode,
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
                  limit: 10, sort: { order: DESC, fields: date },
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
              title: 'commercetools Release Notes',
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
