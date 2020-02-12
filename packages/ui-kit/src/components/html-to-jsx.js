import React from 'react';
import PropTypes from 'prop-types';
import parse5 from 'parse5';

// Maps DOM attribute names to React DOM attribute names
// https://reactjs.org/docs/dom-elements.html
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

// Render a string containing HTML markup as a React component. The string is
// parsed into an AST and converted into React elements.
const HtmlToJsx = props => {
  const htmlFragment = parse5.parseFragment(props.value);
  return React.createElement(
    React.Fragment,
    null,
    htmlFragment.childNodes.map(nodeToJsx)
  );
};
HtmlToJsx.propTypes = {
  value: PropTypes.string.isRequired,
};

export default HtmlToJsx;
