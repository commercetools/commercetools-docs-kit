const unified = require('unified');
const remarkParse = require('remark-parse');

async function extractAPITagInfo(tagList, mdxNode) {
  if (!Array.isArray(tagList) || tagList.length === 0) {
    return;
  }
  const { body: mdxContent } = mdxNode;

  const { default: remarkMdx } = await import('remark-mdx');
  // parse mdx body into mdx AST
  const ast = unified().use(remarkParse).use(remarkMdx).parse(`
import { ApiEndpoint } from '/shortcodes'

# heading 1

<ApiEndpoint apiKey="test" resource="/{projectKey}/resource/{id}" method="GET" title="Custom Title from MDX" />

# heading 2
  `);

  console.log(JSON.stringify(ast, null, 2));
}

module.exports = extractAPITagInfo;
