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
const processTableOfContentFields = require('./utils/process-table-of-content-fields');
const defaultOptions = require('./utils/default-options');
const bootstrapThemeAddOns = require('./utils/bootstrap-theme-addons');
const colorPresets = require('./color-presets');

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = (gatsbyApi, themeOptions) => {
  const requiredDirectories = [
    'src/data',
    'src/images',
    'src/images/releases',
    'src/content',
    'src/content/files',
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
        resolve(source, args, context) {
          const site = context.nodeModel.getAllNodes({ type: 'Site' })[0];
          // getAllNodes is deprecated starting gatsby v4 but the "findOne" replacement
          // is async and we've yet to figure out how to do the async call here inside the resolver:
          // const site = await context.nodeModel.findOne({
          //  query: { type: 'Site' },
          // });
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
  }) =>
  async (source, args, context, info) => {
    const type = info.schema.getType(typeName);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const field = type.getFields()[fieldName];
    const result = await field.resolve(resolveNode(mdxNode), args, context, {
      fieldName,
    });

    return processResult(result);
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

  // Create a new type representing a Content Page
  // https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  actions.createTypes(
    schema.buildObjectType({
      name: 'ContentPage',
      fields: {
        id: { type: 'ID!' },
        slug: { type: 'String!' },
        title: { type: 'String!' },
        websitePrimaryColor: { type: 'String!' },
        excludeFromSearchIndex: { type: 'Boolean!' },
        isGlobalBeta: { type: 'Boolean!' },
        allowWideContentLayout: { type: 'Boolean!' },
        beta: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve: resolverPassthrough({ fieldName: 'body' }),
        },
        tableOfContents: {
          type: 'JSON',
          args: {
            maxDepth: {
              type: `Int`,
              default: 6,
            },
          },
          resolve: resolverPassthrough({
            fieldName: 'tableOfContents',
            processResult: processTableOfContentFields,
          }),
        },
        navLevels: { type: 'Int!' },
      },
      interfaces: ['Node'],
    })
  );

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
        isGlobalBeta: { type: 'Boolean!' },
        date: { type: 'Date!', extensions: { dateformat: {} } },
        description: { type: 'String!' },
        type: { type: 'ReleaseNoteType!' },
        topics: { type: '[String!]!' },
        published: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve: resolverPassthrough({ fieldName: 'body' }),
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

exports.onCreateNode = (
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
  if (isReleaseNotesPage) {
    const excerptSplit = node.rawBody.split('<!--more-->');
    const releaseNotesFieldData = {
      slug: generateReleaseNoteSlug(node),
      title: node.frontmatter.title,
      websitePrimaryColor: colorPreset.value.primaryColor,
      isGlobalBeta: Boolean(pluginOptions.beta),
      excludeFromSearchIndex:
        Boolean(node.frontmatter.excludeFromSearchIndex) ||
        Boolean(pluginOptions.excludeFromSearchIndex),
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
      },
    });
    actions.createParentChildLink({
      parent,
      child: node,
    });
    return;
  }

  // If not explicitly handled, always fall back to build the page as a "content" page.
  // This is useful in case the website requires additional MDX pages located in
  // other file system directories, and thus with different `sourceInstanceName` names.
  const contentPageFieldData = {
    slug: trimTrailingSlash(slug) || '/',
    title: node.frontmatter.title,
    websitePrimaryColor: colorPreset.value.primaryColor,
    isGlobalBeta: Boolean(pluginOptions.beta),
    excludeFromSearchIndex:
      // frontmatter can only exclude in an otherwise not excluded site,
      // but it can't include in a generally excluded site
      Boolean(node.frontmatter.excludeFromSearchIndex) ||
      Boolean(pluginOptions.excludeFromSearchIndex),
    allowWideContentLayout:
      // the frontmatter `wideLayout` and the theme's allowWideContentLayout
      // must be set for the page to switch to wide layout
      Boolean(
        node.frontmatter.wideLayout && pluginOptions.allowWideContentLayout
      ),
    beta: Boolean(pluginOptions.beta) || Boolean(node.frontmatter.beta),
    navLevels: node.frontmatter.navLevels
      ? Number(node.frontmatter.navLevels)
      : 3,
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
    },
  });
  actions.createParentChildLink({
    parent,
    child: node,
  });
};

function generateReleaseNoteSlug(node) {
  const basePath = '/releases';

  if (node.fileAbsolutePath.endsWith('index.mdx')) {
    return basePath;
  }

  if (node.frontmatter.slug) {
    return trimTrailingSlash(`${basePath}/${node.frontmatter.slug}`);
  }

  const date = node.frontmatter.date ? node.frontmatter.date.split('T')[0] : '';
  const title = node.frontmatter.title ? node.frontmatter.title : '';

  const slug = slugify(`${date} ${title}`, { lower: true, strict: true });
  return trimTrailingSlash(`${basePath}/${slug}`);
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async (...args) => {
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
        }
      }
      allReleaseNotePage(sort: { order: DESC, fields: date }) {
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
  pages.forEach(({ slug }) => {
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
        actions.createPage({
          ...pageData,
          component: require.resolve('./src/templates/homepage.js'),
          context: {
            ...pageData.context,
            heroBackgroundRelativePath: `${colorPreset.relativePath}/${colorPreset.value.heroBackgroundName}`,
            heroBackgroundColor: colorPreset.value.bannerBackgroundColor,
          },
        });
        break;
      }
      case '/releases':
        actions.createPage({
          ...pageData,
          component: require.resolve('./src/templates/release-notes-list.js'),
        });
        break;

      default:
        actions.createPage({
          ...pageData,
          component: require.resolve('./src/templates/page-content.js'),
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
  result.data.allReleaseNotePage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: slug,
      // This component will wrap our MDX content
      component: require.resolve('./src/templates/release-notes-detail.js'),
      // You can use the values in this context in our page layout component
      context: {
        slug,
      },
    });
  });
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
            // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
            // See related PR: https://github.com/smooth-code/svgr/pull/137
            icon: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
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
  // This will completely replace the webpack config with the modified object.
  // (necessary to not only add rules but also change rules like taking over svg handling)
  actions.replaceWebpackConfig(config);
};
