const {
  reduceNode,
  collapseSpace,
  isJsxElement,
  getJsxChildren,
} = require('./jsx-ast-utils');

// Contains methods that form a transformation pipeline converting the JSX
// AST outputted by Babel's parser to a simpler, reduced component tree that
// is used as the data model for the plugin

/**
 * Serializes a node to string and searches for any embedded lingering JSX
 * tags contained within, invoking the given callback whenever detached
 * head(s) are identified
 * @param {object} node Babel JSX AST
 * @param {boolean} collapse Whether to collapse whitespace in JSX snippets
 * @param {function} handleDetachedHeads Callback once detached head(s) are found,
 * called with an array of Babel JSX AST nodes
 * @param {object} context Context object
 */
function serializeAndSearch(node, collapse, handleDetachedHeads, context) {
  const { cleanWhitespace, jsx } = context;
  const value = reduceNode(node, cleanWhitespace && collapse, jsx);
  const subJsx = getJsxChildren(node);
  if (subJsx.length > 0) {
    // The value is (or contains) one or more JSX tree heads
    handleDetachedHeads(subJsx);
  }
  return value;
}

/**
 * Reduces component node children by removing whitespace-only text nodes
 * and collapsing whitespace in all text nodes as neccessary (depending on
 * options)
 * @param {array} children Array of reduced component nodes
 * @param {object} context Context object
 */
function reduceChildren(children, context) {
  const { cleanWhitespace } = context;
  return children.reduce((reduced, child, i) => {
    if (typeof child === 'string') {
      // Left trim first child, right trim last child (if configured to)
      const isFirst = i === 0;
      const isLast = i === children.length - 1;
      let trimmed = child;
      if (isFirst && cleanWhitespace) trimmed = trimmed.trimLeft();
      if (isLast && cleanWhitespace) trimmed = trimmed.trimRight();

      const whitespaceCollapsed = cleanWhitespace
        ? collapseSpace(trimmed)
        : trimmed;
      // Only add if the string is not just whitespace
      const whitespaceRemoved = child.replace(/\s/g, '');
      if (whitespaceRemoved.length > 0) {
        return [...reduced, whitespaceCollapsed];
      }

      return reduced;
    }

    // Don't touch node children
    return [...reduced, child];
  }, []);
}

/**
 * Transforms a spread JSX attribute into an array of simple attributes that can be
 * parsed from the object expression contained within. Only works for object literals
 * like <img {...{src: "", "alt": ""}} />
 * @param {object} attribute Babel JSX AST attribute node
 * @param {object} context Context object
 */
function transformSpreadAttribute(attribute, context) {
  // Keep track of any JSX elements seen outside of direct children to parse
  // and index (but not tag as children of the current element)
  const detachedHeads = [];
  const handleDetachedHeads = (heads) => detachedHeads.push(...heads);
  const reducedAttributes = [];

  if (attribute.argument.type === 'ObjectExpression') {
    const parsed = serializeAndSearch(
      attribute.argument,
      true,
      handleDetachedHeads,
      context
    );

    if (typeof parsed === 'object') {
      Object.entries(parsed).forEach(([key, value]) => {
        reducedAttributes.push({ name: key, value });
      });
    }
  }

  return [reducedAttributes, detachedHeads];
}

/**
 * Reduces Babel JSX AST nodes into a list of valid attribute objects, parsing
 * both simple a="b"/a={b} properties as well as indirect spread properties like
 * {...{a: b}}
 * @param {array} attributes Array of Babel JSX AST nodes
 * @param {object} context Context object
 */
function transformAttributes(attributes, context) {
  const { removeMdxCompilationArtifacts } = context;

  // Keep track of any JSX elements seen outside of direct children to parse
  // and index (but not tag as children of the current element)
  const detachedHeads = [];
  const reduceExpression = (node, collapse = false) =>
    serializeAndSearch(
      node,
      collapse,
      (heads) => detachedHeads.push(...heads),
      context
    );

  let reducedAttributes = [];
  attributes.forEach((attribute) => {
    if (attribute.type === 'JSXAttribute') {
      // Parse simple attribute
      // ex. <tag name="value" />
      // ex. <tag name={expression} />
      // ex. <tag name />
      const { name: nameNode, value: valueNode } = attribute;
      const { name } = nameNode;
      let value;
      if (valueNode === null) {
        // value wasn't specified, so treat as truthy boolean
        value = true;
      } else {
        // value was specified, parse
        const shouldCollapse =
          valueNode.type !== 'StringLiteral' &&
          valueNode.type !== 'TemplateLiteral';
        value = reduceExpression(valueNode, shouldCollapse);
      }
      reducedAttributes.push({
        name,
        value,
      });
    } else if (attribute.type === 'JSXSpreadAttribute') {
      // Parse rest attibute like in <tag {...{ key: "value" }} />
      const [reduced, foundHeads] = transformSpreadAttribute(
        attribute,
        context
      );
      reducedAttributes.push(...reduced);
      detachedHeads.push(...foundHeads);
    }
  });

  // Remove attributes with name of "mdxType" or "parentName" if configured to
  if (removeMdxCompilationArtifacts) {
    reducedAttributes = reducedAttributes.filter(
      ({ name }) => name !== 'mdxType' && name !== 'parentName'
    );
  }

  return [reducedAttributes, detachedHeads];
}

/**
 * Transforms a single JSX element AST node to its reduced form as a component
 * node, converting both attributes and children (recursively). Additionally, it
 * will attach its old AST node if configured to
 * @param {object} jsxElement Babel JSX AST node of type JSXElement
 * @param {object} context Context object
 */
function transformJsxElement(jsxElement, context) {
  const { tagListLiteralSet, tagListRegex, jsx } = context;

  // Keep track of any JSX elements seen outside of direct children to parse
  // and index (but not tag as children of the current element)
  let detachedHeads = [];

  // 1. Transform attributes
  let component;
  let attributes = [];
  if (jsxElement.type === 'JSXElement') {
    component = jsxElement.openingElement.name.name;
    const [foundAttributes, foundHeads] = transformAttributes(
      jsxElement.openingElement.attributes,
      context
    );
    detachedHeads = detachedHeads.concat(foundHeads);
    attributes = foundAttributes;
  } else {
    component = 'React.Fragment';
  }

  // 2. Transform children to array of string | reduced node
  let children = [];
  const hasChildren =
    jsxElement.type === 'JSXFragment' || !jsxElement.openingElement.selfClosing;
  if (hasChildren) {
    jsxElement.children.forEach((child) => {
      const [node, foundHeads] = transformNode(child, context);
      if (node !== null) {
        children.push(node);
        detachedHeads = detachedHeads.concat(foundHeads);
      }
    });
  }

  // 3. Trim pure whitespace children and otherwise collapse/trim whitespace
  //    as needed
  children = reduceChildren(children, context);

  const hasGatsbyNode =
    tagListLiteralSet.has(component) ||
    tagListRegex.some((r) => component.match(r));
  const reducedNode = {
    component,
    attributes,
    children,
    hasGatsbyNode,
    jsx: reduceNode(jsxElement, false, jsx),
  };
  return [reducedNode, detachedHeads];
}

/**
 * Transforms the current JSX element into a node of the simpler component tree
 * @param {object} node Babel JSX AST node
 * @param {object} context Context object
 */
function transformNode(node, context) {
  // Keep track of any JSX elements seen outside of direct children to parse
  // and index (but not tag as children of the current element)
  const detachedHeads = [];
  const reduceExpression = (jsxNode, collapse = false) =>
    serializeAndSearch(
      jsxNode,
      collapse,
      (heads) => detachedHeads.push(...heads),
      context
    );

  let reducedNode = null;
  if (node.type === 'JSXText') {
    // Simple embedded text like <div>text</div>
    reducedNode = node.value;
  } else if (node.type === 'JSXExpressionContainer') {
    // JSX javascript expression like:
    // ex. <span>{[1,2,3].toString()}</span>
    // ex. <span>{` template string `}</span>
    // ex. <span>{"string literal"}</span>
    // ex. <span>{<em>embedded jsx</em>}</span>
    const { expression } = node;
    if (expression.type === 'StringLiteral') {
      // <span>{"string literal"}</span>
      reducedNode = expression.value;
    } else if (isJsxElement(expression)) {
      // <span>{<em>embedded jsx</em>}</span>
      const [element, foundHeads] = transformJsxElement(expression, context);
      reducedNode = element;
      detachedHeads.push(...foundHeads);
    } else if (expression.type !== 'JSXEmptyExpression') {
      // anything but <span>{}</span>
      reducedNode = reduceExpression(expression, true);
    }
  } else if (isJsxElement(node)) {
    // Normal JSX element like <span><img /></span>
    const [element, foundHeads] = transformJsxElement(node, context);
    reducedNode = element;
    detachedHeads.push(...foundHeads);
  }

  return [reducedNode, detachedHeads];
}

/**
 * Reduces the complex babel JSX AST to a simpler component tree
 * @param {object} jsxAst Babel JSX AST root node
 * @param {string} rawJsx Raw JSX document to parse substrings from
 * @param {object} options Options object from gatsby config
 * @see the readme for information on the options object
 */
function reduceJsxAst(
  jsxAst,
  jsx,
  { tagList, cleanWhitespace, removeMdxCompilationArtifacts }
) {
  const context = {
    tagListLiteralSet: new Set(
      tagList.filter((entry) => typeof entry === 'string')
    ),
    tagListRegex: tagList.filter(
      (entry) => typeof entry === 'object' && entry instanceof RegExp
    ),
    cleanWhitespace,
    removeMdxCompilationArtifacts,
    jsx,
  };

  // Transform the tree via queue, adding detached heads to the queue as they
  // are discovered to eventually traverse each JSX element node and produce a
  // final reduced forest.
  // Note: In this plugin, the word "forest" refers to a data structure that
  // consists of multiple independent trees, stored as a list of their heads.
  let queue = [jsxAst];
  const forest = [];
  while (queue.length > 0) {
    const head = queue.shift();
    const [tree, detachedHeads] = transformNode(head, context);
    queue = queue.concat(detachedHeads);
    forest.push(tree);
  }

  return forest;
}

module.exports = reduceJsxAst;

// Export for unit testing
module.exports.reduceChildren = reduceChildren;
