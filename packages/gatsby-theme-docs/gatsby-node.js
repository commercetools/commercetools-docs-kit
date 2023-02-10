/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { ContextReplacementPlugin } = require('webpack');
const slugify = require('slugify');
const generateToC = require('./utils/generate-toc');
const defaultOptions = require('./utils/default-options');
const bootstrapThemeAddOns = require('./utils/bootstrap-theme-addons');
const colorPresets = require('./color-presets');
const extractShortcodeOccurrence = require('./utils/extract-shortcode-occurrence');

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

const isProd = process.env.NODE_ENV === 'production';

let processor;

const debugMem = () => {
  // memory debug mode, forces GC every second and prints a "top" like summary
  if (process.env.DEBUG_GATSBY_MEM === 'true') {
    const top = require('process-top')();
    const v8 = require(`v8`);
    const vm = require(`vm`);
    v8.setFlagsFromString(`--expose_gc`);
    const gc = vm.runInNewContext(`gc`);
    setInterval(() => {
      gc();
      console.log(top.toString());
    }, 1000);
  }
};

const writeHeapDump = () => {
  if (memoryDebugMode) {
    const { writeHeapSnapshot } = require('v8');
    writeHeapSnapshot();
    console.log('Wrote heap snapshot');
  }
};

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = async (gatsbyApi, themeOptions) => {
  const { createProcessor } = await import('@mdx-js/mdx');
  console.log('creating processor');
  processor = createProcessor();
  const requiredDirectories = [
    'src/data',
    'src/images',
    'src/images/releases',
    'src/content',
    'src/content/files',
    'src/topics',
    'src/releases',
    'static',
    'static/downloads',
  ];
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      gatsbyApi.reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });

  // Bootstrap theme add-ons
  bootstrapThemeAddOns(gatsbyApi, themeOptions);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SiteSiteMetadata: {
      // this field is needed by plugins needing an absolute production site URL, e.g. the'gatsby-plugin-feed' plugin
      siteUrl: {
        type: 'String',
        resolve: async (source, args, context) => {
          const site = await context.nodeModel.findOne({ type: 'Site' });
          return `https://${source.productionHostname}${site.pathPrefix}`;
        },
      },
    },
  };
  createResolvers(resolvers);
};

// Inspired by https://github.com/gatsbyjs/gatsby/blob/ead08cc1fd9fa30a46fa8b6b7411141a5c9ba4f8/packages/gatsby-theme-blog-core/gatsby-node.js#L29
const identity = (node) => node;
const resolverPassthrough =
  ({
    typeName = 'Mdx',
    fieldName,
    resolveNode = identity,
    processResult = identity,
    errorFallback = null,
  }) =>
  async (source, args, context, info) => {
    const type = info.schema.getType(typeName);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    if (mdxNode) {
      const field = type.getFields()[fieldName];
      if (!field) {
        return errorFallback;
      }
      const result = await field.resolve(resolveNode(mdxNode), args, context, {
        fieldName,
      });

      return processResult(result);
    } else {
      // On MDX syntax errors the MDX node does not exist instead of showing an error (which is nasty).
      // This emulates the output of the MDX v1 library to show an error to authors.
      // This works when changing a previously working file.
      // Because the parent-child relationship is broken gatsby seems unable to recover after fixing the syntax error.
      // On initial load or start the page is a 404.
      return isProd ? null : errorFallback;
    }
  };

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(`
    type NavigationYaml implements Node @dontInfer {
      id: ID!
      chapterTitle: String! @proxy(from: "chapter-title")
      beta: Boolean
      pagination: Boolean
      pages: [NavigationPage!]
    }
    type NavigationPage {
      title: String!
      path: String!
      beta: Boolean
    }

    type TopMenuYaml implements Node @dontInfer {
      id: ID!
      menuTitle: String! @proxy(from: "menu-title")
      items: [TopMenuItem!]
    }
    type TopMenuItem {
      label: String!
      href: String!
      beta: Boolean
    }
    type TopSideMenuYaml implements Node @dontInfer {
      id: ID!
      label: String!
      href: String!
    }
    type FooterYaml implements Node @dontInfer {
      id: ID!
      label: String!
      href: String!
    }

    enum ReleaseNoteType {
      feature
      fix
      enhancement
      announcement
    }
  `);

  const staticErrorMdx = `
  return function MDXContent() {
    return mdx(
      "code",
      null,
      "Gatsby could not find the MDX data for this page. You may have a syntax error in your MDX file, check the console for errors and RESTART the dev server."
    );
  };
  MDXContent.isMDXComponent = true;
  `;

  // Create a new type representing a Content Page
  // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  const typeDefs = [
    schema.buildObjectType({
      name: 'ContentPage',
      fields: {
        id: { type: 'ID!' },
        slug: { type: 'String!' },
        title: { type: 'String!' },
        websitePrimaryColor: { type: 'String!' },
        excludeFromSearchIndex: { type: 'Boolean!' },
        allowWideContentLayout: { type: 'Boolean!' },
        beta: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve: resolverPassthrough({
            fieldName: 'body',
            errorFallback: staticErrorMdx,
          }),
        },
        tableOfContents: {
          type: 'JSON',
          args: {
            maxDepth: {
              type: `Int`,
              default: 6,
            },
          },
        },
        navLevels: { type: 'Int!' },
        showTimeToRead: { type: 'Boolean' },
        timeToRead: { type: 'Int' },
        estimatedTimeToRead: {
          type: 'Int!',
          resolve: resolverPassthrough({
            fieldName: 'timeToRead',
            errorFallback: 0,
          }),
        },
        shortcodeOccurrence: '[ShortcodeOccurence!]',
      },
      interfaces: ['Node'],
    }),

    schema.buildObjectType({
      name: 'ShortcodeOccurence',
      fields: {
        component: 'String!',
        attributes: '[ShortcodeOccurenceAttribute!]',
      },
    }),

    schema.buildObjectType({
      name: 'ShortcodeOccurenceAttribute',
      fields: {
        name: 'String!',
        value: 'String!',
      },
    }),
  ];

  actions.createTypes(typeDefs);

  // Create a new type representing a Release Note Page.
  // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  actions.createTypes(
    schema.buildObjectType({
      name: 'ReleaseNotePage',
      fields: {
        id: { type: 'ID!' },
        slug: { type: 'String!' },
        title: { type: 'String!' },
        websitePrimaryColor: { type: 'String!' },
        excludeFromSearchIndex: { type: 'Boolean!' },
        date: { type: 'Date!', extensions: { dateformat: {} } },
        description: { type: 'String!' },
        type: { type: 'ReleaseNoteType!' },
        topics: { type: '[String!]!' },
        published: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve: resolverPassthrough({
            fieldName: 'body',
            errorFallback: staticErrorMdx,
          }),
        },
        rawExcerpt: {
          type: 'String!',
        },
        hasMore: {
          type: 'Boolean!',
        },
      },
      interfaces: ['Node'],
    })
  );
};

exports.onCreateNode = async (
  { node, getNode, actions, createNodeId, createContentDigest },
  themeOptions
) => {
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const pluginOptions = { ...defaultOptions, ...themeOptions };
  const colorPreset = colorPresets[pluginOptions.colorPreset];

  const parent = getNode(node.parent);

  const originalSlug = createFilePath({ node, getNode, basePath: 'pages' });
  const slug = pluginOptions.createNodeSlug
    ? pluginOptions.createNodeSlug(originalSlug, { node })
    : originalSlug;

  const isReleaseNotesPage =
    parent.internal.mediaType === 'text/mdx' &&
    parent.sourceInstanceName === 'releaseNotes';

  const isContentPage =
    parent.internal.mediaType === 'text/mdx' &&
    (parent.sourceInstanceName === 'content' ||
      parent.sourceInstanceName === 'internalContent');

  if (isReleaseNotesPage) {
    const excerptSplit = node.body.split('{/* more */}');
    const releaseNotesFieldData = {
      slug: generateReleaseNoteSlug(node),
      title: node.frontmatter.title,
      websitePrimaryColor: colorPreset.value.primaryColor,
      excludeFromSearchIndex: Boolean(node.frontmatter.excludeFromSearchIndex),
      date: node.frontmatter.date,
      description: node.frontmatter.description,
      type: node.frontmatter.type,
      topics: node.frontmatter.topics || [],
      published: Boolean(node.frontmatter.published),
      rawExcerpt: excerptSplit[0],
      hasMore: excerptSplit.length > 1,
    };
    actions.createNode({
      ...releaseNotesFieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> ReleaseNotePage`),
      parent: node.id,
      children: [],
      internal: {
        type: 'ReleaseNotePage',
        contentDigest: createContentDigest(releaseNotesFieldData),
        content: JSON.stringify(releaseNotesFieldData),
        description: 'Release Note Pages',
        contentFilePath: node.internal.contentFilePath,
      },
    });
    actions.createParentChildLink({
      parent,
      child: node,
    });
    return;
  }

  if (isContentPage) {
    // https://github.com/unifiedjs/unified#processorparsefile
    const nodeBodyAst = processor.parse(node.body);
    // If not explicitly handled, always fall back to build the page as a "content" page.
    // This is useful in case the website requires additional MDX pages located in
    // other file system directories, and thus with different `sourceInstanceName` names.
    const contentPageFieldData = {
      slug: trimTrailingSlash(slug) || '/',
      title: node.frontmatter.title,
      websitePrimaryColor: colorPreset.value.primaryColor,
      excludeFromSearchIndex:
        // frontmatter can only exclude in an otherwise not excluded site,
        // but it can't include in a generally excluded site
        Boolean(node.frontmatter.excludeFromSearchIndex),
      allowWideContentLayout: Boolean(node.frontmatter.wideLayout),
      beta: Boolean(node.frontmatter.beta),
      navLevels: node.frontmatter.navLevels
        ? Number(node.frontmatter.navLevels)
        : 3,
      showTimeToRead: node.frontmatter.showTimeToRead
        ? Boolean(node.frontmatter.showTimeToRead)
        : false,
      timeToRead: node.frontmatter.timeToRead
        ? Number(node.frontmatter.timeToRead)
        : 0,
      shortcodeOccurrence: extractShortcodeOccurrence(
        ['ApiType', 'ApiEndpoint'],
        nodeBodyAst
      ),
      tableOfContents: await generateToC(nodeBodyAst),
    };

    actions.createNode({
      ...contentPageFieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> ContentPage`),
      parent: node.id,
      children: [],
      internal: {
        type: 'ContentPage',
        contentDigest: createContentDigest(contentPageFieldData),
        content: JSON.stringify(contentPageFieldData),
        description: 'Content Pages',
        contentFilePath: node.internal.contentFilePath,
      },
    });
    actions.createParentChildLink({
      parent,
      child: node,
    });
  }
};

function generateReleaseNoteSlug(node) {
  const basePath = '/releases';

  if (node.internal.contentFilePath.endsWith('index.mdx')) {
    return basePath;
  }

  if (node.frontmatter.slug) {
    return trimTrailingSlash(`${basePath}/${node.frontmatter.slug}`);
  }

  const date = node.frontmatter.date
    ? node.frontmatter.date.toISOString().split('T')[0]
    : '';
  const title = node.frontmatter.title ? node.frontmatter.title : '';

  const slug = slugify(`${date} ${title}`, { lower: true, strict: true });
  return trimTrailingSlash(`${basePath}/${slug}`);
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async (...args) => {
  debugMem();
  await createContentPages(...args);
  await createReleaseNotePages(...args);
};

async function createContentPages(
  { graphql, actions, reporter },
  themeOptions
) {
  const pluginOptions = { ...defaultOptions, ...themeOptions };

  const result = await graphql(`
    query QueryAllContentPages {
      allContentPage {
        nodes {
          slug
          internal {
            contentFilePath
          }
        }
      }
      allReleaseNotePage(sort: { date: DESC }) {
        totalCount
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `🚨  ERROR: Loading all MDX files.\nPlugin options: ${JSON.stringify(
        pluginOptions
      )}`
    );
  }
  const navigationYamlResult = await graphql(`
    query QueryNavigationYaml {
      allNavigationYaml {
        nodes {
          chapterTitle
          pages {
            title
            path
          }
        }
      }
    }
  `);
  if (navigationYamlResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allNavigationYaml" query');
  }
  const pages = result.data.allContentPage.nodes;
  const navigationPages =
    navigationYamlResult.data.allNavigationYaml.nodes.reduce(
      (pageLinks, node) => [...pageLinks, ...(node.pages || [])],
      []
    );
  pages.forEach(({ slug, internal: { contentFilePath: contentPath } }) => {
    const matchingNavigationPage = navigationPages.find(
      (page) => trimTrailingSlash(page.path) === trimTrailingSlash(slug)
    );
    const pageData = {
      path: slug,
      // You can use the values in this context in our page layout component
      context: {
        slug,
        shortTitle: matchingNavigationPage
          ? matchingNavigationPage.title
          : undefined,
        hasReleaseNotes: result.data.allReleaseNotePage.totalCount > 0,
      },
    };
    switch (slug) {
      case '/': {
        const colorPreset = colorPresets[pluginOptions.colorPreset];
        const homepageTemplate = require.resolve('./src/templates/homepage.js');
        actions.createPage({
          ...pageData,
          component: `${homepageTemplate}?__contentFilePath=${contentPath}`,
          context: {
            ...pageData.context,
            heroBackgroundRelativePath: `${colorPreset.relativePath}/${colorPreset.value.heroBackgroundName}`,
            heroBackgroundColor: colorPreset.value.bannerBackgroundColor,
          },
        });

        break;
      }
      // TODO is this case necessary?  The whole function is only querying content pages.
      case '/releases':
        const releaseNoteTemplate = require.resolve(
          './src/templates/release-notes-list.js'
        );

        actions.createPage({
          ...pageData,
          component: `${releaseNoteTemplate}?__contentFilePath=${contentPath}`,
        });

        break;

      default:
        const pageContentTemplate = require.resolve(
          './src/templates/page-content.js'
        );

        actions.createPage({
          ...pageData,
          component: `${pageContentTemplate}?__contentFilePath=${contentPath}`,
        });

        break;
    }
  });
}

async function createReleaseNotePages(
  { graphql, actions, reporter },
  themeOptions
) {
  const pluginOptions = { ...defaultOptions, ...themeOptions };

  const result = await graphql(`
    query QueryAllReleaseNotePages {
      allReleaseNotePage {
        nodes {
          slug
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `🚨  ERROR: Loading all MDX files.\nPlugin options: ${JSON.stringify(
        pluginOptions
      )}`
    );
  }
  result.data.allReleaseNotePage.nodes.forEach(
    ({ slug, internal: { contentFilePath: rnPath } }) => {
      const releaseNoteDetailTemplate = require.resolve(
        './src/templates/release-notes-detail.js'
      );
      actions.createPage({
        path: slug,
        // This component will wrap our MDX content
        component: `${releaseNoteDetailTemplate}?__contentFilePath=${rnPath}`,
        // You can use the values in this context in our page layout component
        context: {
          slug,
        },
      });
    }
  );
}

exports.onCreateWebpackConfig = (
  { actions, getConfig, stage, loaders },
  themeOptions
) => {
  const pluginOptions = { ...defaultOptions, ...themeOptions };

  const config = getConfig();
  config.module.rules = [
    // Strip out the svg files from the following built-in rule
    // See https://github.com/zabute/gatsby-plugin-svgr/blob/master/gatsby-node.js
    ...config.module.rules.map((rule) => {
      // Gatsby ≥ 2.30 (AVIF support)
      if (
        String(rule.test) ===
        String(/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/)
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/,
        };
      }

      return rule;
    }),
    {
      // Fix for react-intl
      // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
      test: /\.mjs$/,
      type: 'javascript/auto',
    },
    {
      test: /\.svg$/,
      include: /icons/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            icon: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
              ],
            },
          },
        },
      ],
    },
  ];
  if (stage === 'build-html' || stage === 'develop-html') {
    // https://www.gatsbyjs.com/docs/debugging-html-builds/#fixing-third-party-modules
    config.module.rules.push({
      test: /tmp/,
      use: loaders.null(),
    });
  }
  // improve build performance in memory critical stage of builds by not generating source maps
  // (yes, this can make errors cryptic, we will have to revisit if it's firing back too much)
  if (stage === 'build-html' || stage === `build-javascript`) {
    config.devtool = false;
  }

  // improve build performance in memory critical stage of builds by not generating source maps
  // (yes, this can make errors cryptic, we will have to revisit if it's firing back too much)
  if (stage === 'build-html' || stage === `build-javascript`) {
    config.devtool = false;
  }

  // https://webpack.js.org/configuration/cache/
  // don't mess with "type", "name","cacheLocation" ,"buildDependencies" - these are for sure controlled by gatsby
  // the develop stage has a significant problem with webpack using Buffers ("ext" memory).
  if (stage === `develop` || stage === `develop-html`) {
    config.cache = {
      ...config.cache,
      ...{
        // compression: 'brotli', // only impacts the filesystem representation
        // the following combination at least leads to the dev server freeing some of the memory again once navigating the preview.
        idleTimeout: 100, // defaults to 60000 millis
        idleTimeoutAfterLargeChanges: 100, // defaults to 1000 millis
        allowCollectingMemory: true, // defaults to false.
        maxMemoryGenerations: 0, // see docs https://webpack.js.org/configuration/cache/#cachemaxmemorygenerations
      },
    };
  }

  config.resolve = {
    ...config.resolve,
    // Add support for absolute imports
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      ...config.resolve.fallback,
      electron: false, // webpack can't understand the condition in the "got" module
    },
  };

  // Restricting importing from `prismjs` to only the listed languages,
  // to not blow up the bundle.
  // Inspired by https://github.com/facebook/docusaurus/pull/2250
  const prismLanguages = (pluginOptions.additionalPrismLanguages || [])
    .map((lang) => `prism-${lang}`)
    .join('|');
  config.plugins.push(
    new ContextReplacementPlugin(
      /prismjs[\\/]components$/,
      new RegExp(`^./(${prismLanguages})$`)
    )
  );

  // require("fs"); fs.writeFileSync("webpack-config.json", JSON.stringify(config, null, 2));

  // This will completely replace the webpack config with the modified object.
  // (necessary to not only add rules but also change rules like taking over svg handling)
  actions.replaceWebpackConfig(config);
};
