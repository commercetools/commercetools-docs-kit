/**
 * Determines whether the object passed in has a type (which lets it )
 * @param {object} value The object to examine
 */
function isAstNode(value) {
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
  let children = [];
  if (node != null) {
    // Examine each attribute of the object
    Object.values(node).forEach(value => {
      if (value != null && typeof value === 'object') {
        if (Array.isArray(value)) {
          // Check if it is a node array
          if (value.every(isAstNode)) {
            children = children.concat(value);
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
    node => node.type === 'JSXElement' && node.openingElement.name.name === tag,
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

module.exports = {
  findNode,
  isAstNode,
  getChildren,
  findTag,
  findContentRoot,
};
