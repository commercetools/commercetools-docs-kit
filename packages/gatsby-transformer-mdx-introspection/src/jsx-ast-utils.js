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
  if (trimmed.charAt(trimmed.length - 1) === ';') return trimmed.slice(0, -1);
  return trimmed;
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
    (accum, child) => [...accum, ...findNode(child, isJsxElement, false)],
    []
  );
}

/**
 * Converts a JSX AST node (and its subtree) to a string, using a different
 * method depending on the type:
 *  - If the node is a string literal/template, then it simply takes the inner
 *    value
 *  - Else, the node takes on the value of the direct JSX it came from in the
 *    original file
 * @param {object} node Babel JSX AST
 * @param {boolean} collapse Whether to collapse whitespace in JSX snippets
 * @param {string} jsx Original JSX text
 */
function convertToString(node, collapse, jsx) {
  if (node == null) return '';
  if (node.type === 'StringLiteral') return node.value;

  const str = cleanJsxSnippet(jsx.substring(node.start, node.end));
  if (node.type === 'TemplateLiteral') return str.slice(1, -1);

  return collapse ? collapseSpace(str) : str;
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
  convertToString,
};
