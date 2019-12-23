/**
 * Gets all component nodes from a tree, recursively traversing all children.
 * Note: ignores any nodes marked as "hasGatsbyNode: false", but still traverses
 * their children
 * @param {object} reducedTree Reduced component tree output from reduceJsxAst
 */
function getAllComponentNodes(reducedTree) {
  const children = [];

  function traverse(node) {
    if (typeof node === 'object') {
      if (node.hasGatsbyNode) {
        children.push(node);
      }

      node.children.forEach(traverse);
    }
  }

  traverse(reducedTree);
  return children;
}

module.exports = getAllComponentNodes;
