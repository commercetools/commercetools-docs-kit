const mdx = require('@mdx-js/mdx');
const babelParser = require('@babel/parser');
const graymatter = require('gray-matter');
const jsxAstUtils = require('./jsx-ast-utils');
const reduceJsxAst = require('./reduce-jsx-ast');

/**
 * Performs the primary business logic of the plugin, transforming an MDX
 * file to a list of simplified component trees where every node represents
 * a JSX node
 * @param {string} rawMdx Mdx file/string to transform
 * @param {object} options Plugin options object
 * @returns array of simplified/reduced component trees as an overall forest
 * (includes the root component tree and any additional orphan trees discovered
 * along the way inside of expression or function blocks)
 */
async function transformMdx(rawMdx, options) {
  // Remove frontmatter before parsing
  const { content: mdxBody } = graymatter(rawMdx);

  // Transform MDX body into JSX AST via mdx-js/Babel
  const jsx = await mdx(mdxBody);
  const ast = babelParser.parse(jsx, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  // Find content root and reduce AST into component forest
  const contentRoot = jsxAstUtils.findContentRoot(ast);

  const reducedForest = reduceJsxAst(contentRoot, jsx, options);
  return reducedForest;
}

module.exports = transformMdx;
