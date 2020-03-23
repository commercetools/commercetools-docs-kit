// Contains utility methods that deal directly with the JSX AST that is
// outputted by Babel's parser

/**
 * Determines whether the object passed in has a type (which lets it )
 * @param {object} value The object to examine
 */
function isAstNode(value) {
  if (value == null || typeof value !== 'object') return false;
  return Object.prototype.hasOwnProperty.call(value, 'type');
}

/**
 * Gets all children nodes (nodes linked to by the current one).
 * Note: does not check for specific properties, just aggregates all
 * collections of linked nodes. May result in improper result if node
 * contains any upreferences
 * @param {object} node Babel JSX AST node
 */
function getChildren(node) {
  const children = [];
  if (node != null) {
    // Examine each attribute of the object
    Object.values(node).forEach((value) => {
      if (value != null && typeof value === 'object') {
        if (Array.isArray(value)) {
          // Check if it is a node array
          if (value.every(isAstNode)) {
            children.push(...value);
          }
          // check if it is a single node
        } else if (isAstNode(value)) {
          children.push(value);
        }
      }
    });
  }
  return children;
}
/**
 * Looks for a JSXElement node with the tag of "MDXLayout" in the given AST.
 * If none is found, returns null
 * @param {object} jsxAst Babel JSX AST node
 */
function findContentRoot(jsxAst) {
  const result = findTag(jsxAst, 'MDXLayout', false);
  if (result.length > 0) return result[0];
  return null;
}

/**
 * Gets each JSXElement node with the matching tag in the given AST
 * @param {object} ast Babel JSX AST node
 * @param {string} tag Tag name
 * @param {boolean} searchMatchChildren Whether to continue searching in a matched
 * node's children
 */
function findTag(ast, tag, searchMatchChildren) {
  return findNode(
    ast,
    (node) =>
      node.type === 'JSXElement' && node.openingElement.name.name === tag,
    searchMatchChildren
  );
}

/**
 * Gets each node that passes the predicate function in the given AST
 * @param {object} ast Babel JSX AST node
 * @param {function} predicate Predicate function to apply
 * @param {boolean} searchMatchChildren Whether to continue searching in a matched
 * node's children
 */
function findNode(ast, predicate, searchMatchChildren) {
  const found = [];

  function traverseAst(node) {
    if (predicate(node)) {
      found.push(node);
      if (!searchMatchChildren) return;
    }

    // Traverse children
    getChildren(node).forEach(traverseAst);
  }

  traverseAst(ast);
  return found;
}

/**
 * Whether the node is a JSX element or fragment node
 * @param {object} node Babel JSX AST node
 */
function isJsxElement(node) {
  return (
    isAstNode(node) &&
    (node.type === 'JSXElement' || node.type === 'JSXFragment')
  );
}

/**
 * Cleans up a JSX snippet string, removing leading/trailing space and a
 * trailing semicolon, if applicable
 * @param {string} raw Raw JSX snippet string
 */
function cleanJsxSnippet(raw) {
  const trimmed = raw.trim();
  return trimmed.replace(/(.*);$/, '$1');
}

/**
 * Removes consecutive whitespace (both horizontal and vertical, separately),
 * leaving only one space/newline in their positions
 * @param {string} string Original string to transform
 */
function collapseSpace(string) {
  const horizontal = string.replace(/[^\S\r\n]{2,}/g, ' ');
  const vertical = horizontal.replace(/[\r\n]{2,}/g, '\n');
  return vertical;
}

/**
 * Finds all JSX element children of the current node
 * @param {object} node Babel JSX AST
 */
function getJsxChildren(node) {
  // Start searching at each child
  return getChildren(node).reduce(
    (children, child) => [...children, ...findNode(child, isJsxElement, false)],
    []
  );
}

/**
 * Reduces an object literal AST node to its literal representation
 * @param {object} node Babel JSX AST
 */
function reduceObjectLiteral(node, jsx) {
  const parsed = {};
  node.properties.forEach((propertyNode) => {
    if (propertyNode.type === 'ObjectProperty') {
      // Try to parse property: only use if not computed like { [a]: "b" }
      if (!propertyNode.computed) {
        // Determine if property was declared with string or identifier
        let name;
        if (propertyNode.key.type === 'Identifier') {
          name = propertyNode.key.name;
        } else {
          // Declared with string literal
          name = propertyNode.key.value;
        }

        // Parse shorthand property like const a = "boo"; { a }
        if (propertyNode.shorthand) {
          parsed[name] = name;
        } else {
          // Parse standard key: value property
          const value = reduceNode(propertyNode.value, true, jsx);
          parsed[name] = value;
        }
      }
    } else if (propertyNode.type === 'ObjectMethod') {
      // Parse the method like { method(arg) { return null; } }
      const asString = reduceNode(propertyNode, true, jsx);
      const methodName = propertyNode.key.name;
      // string like (arg) { return null; }
      const withoutName = asString.substring(
        asString.indexOf(methodName) + methodName.length
      );
      // set the value to be like function(arg) { return null; }
      parsed[methodName] = `function ${withoutName}`;
    }
  });
  return parsed;
}

/**
 * Converts a JSX AST node (and its subtree) to a value, using a different
 * method depending on the type:
 *  - If the node is a literal/template, then it simply takes the inner value
 *  - Else, the node takes on the value of the direct JSX it came from in the
 *    original file
 * @param {object} node Babel JSX AST
 * @param {boolean} collapse Whether to collapse whitespace in JSX snippets
 * @param {string} jsx Original JSX text
 */
function reduceNode(node, collapse, jsx) {
  if (node == null) return '';
  switch (node.type) {
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
      return node.value;

    case 'NullLiteral':
      return null;

    case 'ObjectExpression':
      return reduceObjectLiteral(node, jsx);

    case 'JSXExpressionContainer': {
      const { expression } = node;
      const { type } = expression;

      // Handle undefined
      if (type === 'Identifier' && expression.name === 'undefined')
        return undefined;

      switch (type) {
        case 'StringLiteral':
        case 'TemplateLiteral':
        case 'NumericLiteral':
        case 'BooleanLiteral':
        case 'NullLiteral':
        case 'ObjectExpression':
          // Unwrap inner node
          return reduceNode(expression, collapse, jsx);

        default:
          return `{${reduceNode(expression, collapse, jsx)}}`;
      }
    }

    default: {
      // Handle undefined
      if (node.type === 'Identifier' && node.name === 'undefined')
        return undefined;

      const str = cleanJsxSnippet(jsx.substring(node.start, node.end));
      switch (node.type) {
        case 'TemplateLiteral':
          return str.slice(1, -1);

        default:
          return collapse ? collapseSpace(str) : str;
      }
    }
  }
}

module.exports = {
  findNode,
  isAstNode,
  getChildren,
  findTag,
  findContentRoot,
  cleanJsxSnippet,
  collapseSpace,
  getJsxChildren,
  isJsxElement,
  reduceNode,
};
