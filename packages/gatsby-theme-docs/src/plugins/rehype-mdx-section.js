const isHastHeading = require('hast-util-heading');

const isHeading = (node) => {
  return isHastHeading(node);
};

// Since we are mapping the headings shifted to one in the markdown provider
// (e.g. h1 -> h2, h2 -> h3), we return the shifted tagName here as well.
const mapNodeTagName = (tagName) =>
  tagName.replace(/([0-9])$/, (match) => parseInt(match, 10) + 1);

// check for empty sections or sections that are just a blank line
// (e.g. after an import statement or because there is no content in the lead)
const sectionIsBlank = (sectionNode) => {
  if (sectionNode.children.length === 0) return true;
  if (!sectionNode.children.some((n) => n.type !== 'text' || n.value !== '\n'))
    return true;
  return false;
};

module.exports =
  ({ leadSectionClassSuffix = 'lead' } = {}) =>
  (ast) => {
    const newNodes = [];
    let sectionNode = {
      type: 'element',
      tagName: 'section',
      properties: {
        class: `section-${leadSectionClassSuffix}`,
      },
      children: [],
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const node of ast.children) {
      if (isHeading(node)) {
        if (!sectionIsBlank(sectionNode)) {
          newNodes.push(sectionNode);
        }
        sectionNode = {
          type: 'element',
          tagName: 'section',
          properties: {
            id: `section-${node.properties.id}`,
            class: `section-${mapNodeTagName(node.tagName)}`,
          },
          children: [node],
        };
      } else if (node.type === 'mdxjsEsm') {
        newNodes.push(node);
      } else {
        sectionNode.children.push(node);
      }
    }
    if (!sectionIsBlank(sectionNode)) {
      newNodes.push(sectionNode);
    }
    // eslint-disable-next-line no-param-reassign
    ast.children = newNodes;
    return ast;
  };
