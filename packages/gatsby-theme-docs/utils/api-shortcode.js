// loaded via require because we use the pre-ESM version at the moment.
// to be changed once upgraded to a latest version
const visit = require('unist-util-visit');

async function extractShortcodeOccurrence(shortcodeList, mdxNode) {
  if (!Array.isArray(shortcodeList) || shortcodeList.length === 0) {
    return;
  }
  const { body: mdxContent } = mdxNode;

  // using the processor interface from the full mdx package instead of working directly with remark-mdx
  // to be sure that the various dependency and unified libraries fit.
  const { createProcessor } = await import('@mdx-js/mdx');
  const processor = createProcessor();
  // https://github.com/unifiedjs/unified#processorparsefile
  const ast = processor.parse(mdxContent);

  const shortcodes = []; // {name: shortCodeName, attributes: [{name: foo, value: bar}]}

  const isShortcode = (node) => {
    return (
      node.type === 'mdxJsxFlowElement' && shortcodeList.includes(node.name)
    );
  };

  // https://unifiedjs.com/explore/package/unist-util-is/#test
  visit(ast, isShortcode, (node) => {
    shortcodes.push({
      component: node.name,
      attributes: node.attributes.map((attr) => ({
        name: attr.name,
        value: attr.value || '',
      })),
    });
  });

  // remove duplicates (if they exist)
  return shortcodes.filter(
    (item, index, array) =>
      array.findIndex(
        (item2) => JSON.stringify(item2) === JSON.stringify(item)
      ) === index
  );
}

module.exports = extractShortcodeOccurrence;
