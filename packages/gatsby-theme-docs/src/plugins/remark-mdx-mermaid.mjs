import visit from 'unist-util-visit';

/**
 * Given the MDXAST ast, look for all fenced codeblocks that have a language of
 * `mermaid` and replace them with a <Mermaid> JSX component containing the mermaid code.
 * MDXAST reference: https://github.com/mdx-js/specification#jsx-1
 *
 * @param {object}  ast
 * @return {function}
 */
const remarkMdxMermaid = () => (ast) => {
  visit(ast, { type: 'code', lang: 'mermaid' }, (node) => {
    return Object.assign(node, {
      type: 'jsx',
      value: '<Mermaid graph={`' + node.value + '`} />',
    });
  });
};
export default remarkMdxMermaid;
