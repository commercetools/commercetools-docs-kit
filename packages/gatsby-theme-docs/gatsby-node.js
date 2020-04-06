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

const trimTrailingSlash = (url) => url.replace(/(\/?)$/, '');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  const requiredDirectories = [
    'src/data',
    'src/images',
    'src/content',
    'src/content/files',
    'src/code-examples',
    pluginOptions.hasReleaseNotes && 'src/releases',
  ].filter(Boolean);
  requiredDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.sourceNodes = ({ actions }) => {
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
  `);
};

exports.onCreateNode = ({ node, getNode, actions }, pluginOptions) => {
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const originalSlug = createFilePath({ node, getNode, basePath: 'pages' });
  const slug = pluginOptions.createNodeSlug
    ? pluginOptions.createNodeSlug(originalSlug, { node })
    : originalSlug;

  // Common fields from frontmatter values
  // This is necessary to ensure that we always have those fields in the schema
  // instead of relying on GraphQL inferring the schema from the MDX pages.
  // See https://github.com/gatsbyjs/gatsby/pull/5495#issuecomment-392882900
  actions.createNodeField({
    node,
    name: 'title',
    value: node.frontmatter.title,
  });
  actions.createNodeField({
    node,
    name: 'beta',
    value: Boolean(pluginOptions.beta) || Boolean(node.frontmatter.beta),
  });
  actions.createNodeField({
    node,
    name: 'isGlobalBeta',
    value: Boolean(pluginOptions.beta),
  });
  actions.createNodeField({
    node,
    name: 'excludeFromSearchIndex',
    value:
      Boolean(node.frontmatter.excludeFromSearchIndex) ||
      Boolean(pluginOptions.excludeFromSearchIndex),
  });
  actions.createNodeField({
    node,
    name: 'hasReleaseNotes',
    value: Boolean(pluginOptions.hasReleaseNotes),
  });

  const isContentPage = node.fileAbsolutePath.startsWith(
    path.resolve('src/content')
  );
  if (isContentPage) {
    actions.createNodeField({
      node,
      name: 'slug',
      value: trimTrailingSlash(slug) || '/',
    });
  }

  if (pluginOptions.hasReleaseNotes) {
    const isReleaseNotesPage = node.fileAbsolutePath.startsWith(
      path.resolve('src/releases')
    );
    if (isReleaseNotesPage) {
      const releaseNoteSlug = generateReleaseNoteSlug(node);
      actions.createNodeField({
        node,
        name: 'slug',
        value: releaseNoteSlug,
      });
      actions.createNodeField({
        node,
        name: 'date',
        value: node.frontmatter.date,
      });
      actions.createNodeField({
        node,
        name: 'description',
        value: node.frontmatter.description,
      });
      actions.createNodeField({
        node,
        name: 'type',
        value: node.frontmatter.type,
      });
      actions.createNodeField({
        node,
        name: 'topics',
        value: node.frontmatter.topics,
      });
    }
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
      allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          internal: { mediaType: { eq: "text/mdx" } }
        }
      ) {
        nodes {
          childMdx {
            id
            fields {
              slug
              title
              beta
              isGlobalBeta
              excludeFromSearchIndex
              hasReleaseNotes
            }
          }
          name
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
  const pages = result.data.allFile.nodes;
  const navigationPages = navigationYamlResult.data.allNavigationYaml.nodes.reduce(
    (pageLinks, node) => [...pageLinks, ...(node.pages || [])],
    []
  );
  pages.forEach(({ childMdx, name }) => {
    if (name === 'releases') {
      reporter.panicOnBuild(
        '🚨  ERROR: file named "releases" is not allowed in src/content directory'
      );
      return;
    }

    const matchingNavigationPage = navigationPages.find(
      (page) =>
        trimTrailingSlash(page.path) === trimTrailingSlash(childMdx.fields.slug)
    );
    actions.createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: childMdx.fields.slug,
      // This component will wrap our MDX content
      component: require.resolve('./src/templates/page-content.js'),
      // You can use the values in this context in
      // our page layout component
      context: {
        ...childMdx.fields,
        shortTitle: matchingNavigationPage
          ? matchingNavigationPage.title
          : undefined,
      },
    });
  });
}

async function createReleaseNotePages(
  { graphql, actions, reporter },
  pluginOptions
) {
  if (!pluginOptions.hasReleaseNotes) return;

  const result = await graphql(`
    query QueryAllReleaseNotePages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "releases" }
          internal: { mediaType: { eq: "text/mdx" } }
        }
      ) {
        nodes {
          childMdx {
            id
            fields {
              slug
              title
              beta
              isGlobalBeta
              excludeFromSearchIndex
              hasReleaseNotes
              date
              description
              type
              topics
            }
          }
          name
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
  result.data.allFile.nodes.forEach(({ childMdx, name }) => {
    const isOverviewPage = name === 'index';
    actions.createPage({
      // TODO: how should the path be named exactly?
      path: childMdx.fields.slug,
      component: isOverviewPage
        ? require.resolve('./src/templates/release-notes-list.js')
        : require.resolve('./src/templates/release-notes-detail.js'),
      context: {
        ...childMdx.fields,
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
