/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createFilePath } = require('gatsby-source-filesystem');
const { ContextReplacementPlugin } = require('webpack');
const slugify = require('slugify');

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = [
    'src/data',
    'src/images',
    'src/content',
    'src/content/files',
    'src/code-examples',
    'src/releases',
  ];
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.sourceNodes = ({ actions, schema }) => {
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
        excludeFromSearchIndex: { type: 'Boolean!' },
        isGlobalBeta: { type: 'Boolean!' },
        beta: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const mdxField = type.getFields().body;
            return mdxField.resolve(mdxNode, {}, context, {
              fieldName: 'body',
            });
          },
        },
        tableOfContents: {
          type: 'JSON',
          args: {
            maxDepth: { type: 'Int' },
          },
          resolve(source, args, context, info) {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const mdxField = type.getFields().tableOfContents;
            return mdxField.resolve(mdxNode, args, context, {
              fieldName: 'tableOfContents',
            });
          },
        },
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
        excludeFromSearchIndex: { type: 'Boolean!' },
        isGlobalBeta: { type: 'Boolean!' },
        date: {
          type: 'Date!',
          args: {
            formatString: { type: 'String' },
          },
          resolve(source, args, context, info) {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const mdxField = type.getFields().date;
            if (mdxField) {
              return mdxField.resolve(mdxNode, args, context, {
                fieldName: 'date',
              });
            }
            return '';
          },
        },
        description: { type: 'String!' },
        type: { type: 'ReleaseNoteType!' },
        topics: { type: '[String!]!' },
        published: { type: 'Boolean!' },
        body: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const mdxField = type.getFields().body;
            return mdxField.resolve(mdxNode, {}, context, {
              fieldName: 'body',
            });
          },
        },
      },
      interfaces: ['Node'],
    })
  );
};

exports.onCreateNode = (
  { node, getNode, actions, createNodeId },
  pluginOptions
) => {
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const parent = getNode(node.parent);

  const originalSlug = createFilePath({ node, getNode, basePath: 'pages' });
  const slug = pluginOptions.createNodeSlug
    ? pluginOptions.createNodeSlug(originalSlug, { node })
    : originalSlug;

  const isContentPage =
    parent.internal.mediaType === 'text/mdx' &&
    parent.sourceInstanceName === 'content';
  if (isContentPage) {
    const fieldData = {
      slug: trimTrailingSlash(slug) || '/',
      title: node.frontmatter.title,
      isGlobalBeta: Boolean(pluginOptions.beta),
      excludeFromSearchIndex:
        Boolean(node.frontmatter.excludeFromSearchIndex) ||
        Boolean(pluginOptions.excludeFromSearchIndex),
      beta: Boolean(pluginOptions.beta) || Boolean(node.frontmatter.beta),
    };
    actions.createNode({
      ...fieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> ContentPage`),
      parent: node.id,
      children: [],
      internal: {
        type: 'ContentPage',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: 'Content Pages',
      },
    });
    actions.createParentChildLink({
      parent,
      child: node,
    });
  }

  const isReleaseNotesPage =
    parent.internal.mediaType === 'text/mdx' &&
    parent.sourceInstanceName === 'releaseNotes';
  if (isReleaseNotesPage) {
    const fieldData = {
      slug: generateReleaseNoteSlug(node),
      title: node.frontmatter.title,
      isGlobalBeta: Boolean(pluginOptions.beta),
      excludeFromSearchIndex:
        Boolean(node.frontmatter.excludeFromSearchIndex) ||
        Boolean(pluginOptions.excludeFromSearchIndex),
      date: node.frontmatter.date,
      description: node.frontmatter.description,
      type: node.frontmatter.type,
      topics: node.frontmatter.topics || [],
      published: Boolean(node.frontmatter.published),
    };
    actions.createNode({
      ...fieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> ReleaseNotePage`),
      parent: node.id,
      children: [],
      internal: {
        type: 'ReleaseNotePage',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: 'Release Note Pages',
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

  if (node.fileAbsolutePath.endsWith('index.mdx')) {
    return basePath;
  }

  if (node.frontmatter.slug) {
    return trimTrailingSlash(`${basePath}/${node.frontmatter.slug}`);
  }

  const date = node.frontmatter.date ? node.frontmatter.date.split('T')[0] : '';
  const title = node.frontmatter.title ? node.frontmatter.title : '';

  const slug = slugify(`${date} ${title}`, { lower: true });
  return trimTrailingSlash(`${basePath}/${slug}`);
}

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async (...args) => {
  await createContentPages(...args);
  await createReleaseNotePages(...args);
};

async function createContentPages(
  { graphql, actions, reporter },
  pluginOptions
) {
  const result = await graphql(`
    query QueryAllContentPages {
      allContentPage {
        nodes {
          slug
        }
      }
      allReleaseNotePage {
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
  const navigationPages = navigationYamlResult.data.allNavigationYaml.nodes.reduce(
    (pageLinks, node) => [...pageLinks, ...(node.pages || [])],
    []
  );
  pages.forEach(({ slug }) => {
    const isOverviewPage = slug === '/releases';
    const matchingNavigationPage = navigationPages.find(
      (page) => trimTrailingSlash(page.path) === trimTrailingSlash(slug)
    );
    actions.createPage({
      path: slug,
      // This component will wrap our MDX content
      component: isOverviewPage
        ? require.resolve('./src/templates/release-notes-list.js')
        : require.resolve('./src/templates/page-content.js'),
      // You can use the values in this context in our page layout component
      context: {
        slug,
        shortTitle: matchingNavigationPage
          ? matchingNavigationPage.title
          : undefined,
        hasReleaseNotes: result.data.allReleaseNotePage.totalCount > 0,
      },
    });
  });
}

async function createReleaseNotePages(
  { graphql, actions, reporter },
  pluginOptions
) {
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

exports.onCreateWebpackConfig = ({ actions, getConfig }, pluginOptions) => {
  const config = getConfig();
  config.module.rules = [
    ...config.module.rules.map((rule) => ({
      ...rule,
      test:
        // Strip out the svg files from the following built-in rule
        // See https://github.com/zabute/gatsby-plugin-svgr/blob/5087926076e61a0d5681c842af42c73d55a89653/gatsby-node.js#L10-L21
        String(rule.test) ===
        String(/\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/)
          ? /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/
          : rule.test,
    })),
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
  config.resolve = {
    ...config.resolve,
    // Add support for absolute imports
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  };

  // Restricting importing from `prismjs` to only the whitelisted languages,
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
  actions.replaceWebpackConfig(config);
};
