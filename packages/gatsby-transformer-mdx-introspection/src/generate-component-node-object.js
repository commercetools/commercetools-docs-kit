const parse5 = require('parse5');

const generateComponentNodeObject = jsxString => {
  const jsxAsDom = parse5.parseFragment(jsxString, {
    scriptingEnabled: false,
  });
  const domNode = jsxAsDom.childNodes[0];

  return {
    attributes: domNode.attrs,
    component: domNode.nodeName,
  };
};

module.exports = generateComponentNodeObject;
