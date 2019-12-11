const parse5 = require('parse5');

const generateComponentNodeObject = jsxString => {
  const jsxAsDom = parse5.parseFragment(jsxString, {
    scriptingEnabled: false,
  });

  // In case we don't get any childNodes, we return early.
  // Example:
  //   { nodeName: '#document-fragment', childNodes: [] }
  if (jsxAsDom.childNodes.length === 0) {
    return undefined;
  }

  const domNode = jsxAsDom.childNodes[0];

  return {
    attributes: domNode.attrs,
    component: domNode.nodeName,
  };
};

module.exports = generateComponentNodeObject;
