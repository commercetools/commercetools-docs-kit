// loaded via require because we use the pre-ESM version at the moment.
// to be changed once upgraded to a latest version
const visit = require('unist-util-visit');

function extractShortcodeOccurrence(shortcodeList, ast) {
  if (!Array.isArray(shortcodeList) || shortcodeList.length === 0) {
    return;
  }

  const shortcodes = []; // {name: shortCodeName, attributes: [{name: foo, value: bar}]}

  const isShortcode = (node) => {
    return (
      node.type === 'mdxJsxFlowElement' && shortcodeList.includes(node.name)
    );
  };

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
