import React from 'react';
import parse5 from 'parse5';

// Maps DOM attribute names to React DOM attribute names
const domToJsx = name => {
  switch (name) {
    case 'class':
      return 'className';
    default:
      return name;
  }
};

// Convert the list of DOM attributes to a Map object
const attrsToJsx = attributes =>
  attributes.reduce(
    (allAttrs, attr) => ({ ...allAttrs, [domToJsx(attr.name)]: attr.value }),
    {}
  );

// Create React elements based on the AST node type.
const nodeToJsx = (node, index) => {
  switch (node.nodeName) {
    // Text nodes contain the actual content
    case '#text': {
      return React.createElement(React.Fragment, { key: index }, node.value);
    }
    default:
      // HTML nodes can be mapped directly to a React element, with the
      // related DOM attributes. Child nodes are converted into React element
      // recursively and passes as a list of children to this React element.
      return React.createElement(
        node.nodeName,
        { ...attrsToJsx(node.attrs), key: index },
        node.childNodes.map(nodeToJsx)
      );
  }
};

const createJsxElement = code => {
  const htmlFragment = parse5.parseFragment(code);
  return React.createElement(
    React.Fragment,
    null,
    htmlFragment.childNodes.map(nodeToJsx)
  );
};

// This factory function returns a new React functional component.
const createReactComponent = code => () => createJsxElement(code);

export default createReactComponent;
