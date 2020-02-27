const jsxAstUtils = require('../src/jsx-ast-utils');

// Tests utility methods in jsx-ast-utils.js

// Simple JSX text element like <span>content</span>
//                                    ^
const mockText = (content = 'text') => ({
  type: 'JSXText',
  extra: {
    rawValue: content,
    raw: content,
  },
  value: content,
});

// Format copied from real AST output for self-closing tag with
// no children: <tag mdxType="tag" />
const mockElement = (tag = 'hr') => ({
  type: 'JSXElement',
  closingElement: null,
  children: [],
  openingElement: {
    type: 'JSXOpeningElement',
    name: {
      type: 'JSXIdentifier',
      name: tag,
    },
    attributes: [
      {
        type: 'JSXAttribute',
        name: {
          type: 'JSXIdentifier',
          name: 'mdxType',
        },
        value: {
          type: 'StringLiteral',
          extra: {
            rawValue: tag,
            raw: `"${tag}"`,
          },
          value: tag,
        },
      },
    ],
    selfClosing: true,
  },
});

// Alternating array of text/jsx elements
const mockNodes = n =>
  Array.from({ length: n }).map((_, i) =>
    i % 2 ? mockText(`text.${i}`) : mockElement()
  );

describe('isAstNode', () => {
  it('returns true for ast nodes', () => {
    expect(jsxAstUtils.isAstNode(mockText())).toBe(true);
  });

  it('returns false for non-ast nodes', () => {
    expect(jsxAstUtils.isAstNode({ tag: 'JSXFragment', val: 0 })).toBe(false);
  });

  it('returns false for invalid inputs', () => {
    expect(jsxAstUtils.isAstNode(null)).toBe(false);
    expect(jsxAstUtils.isAstNode('string')).toBe(false);
  });
});

describe('getChildren', () => {
  it('returns an empty array for a node without children', () => {
    expect(jsxAstUtils.getChildren(mockText())).toEqual([]);
  });

  it('returns the array of children for simple children', () => {
    const children = mockNodes(4);
    const node = mockElement();
    node.children = children;
    // openingElement is also a child node
    expect(new Set(jsxAstUtils.getChildren(node))).toEqual(
      new Set([...children, node.openingElement])
    );
  });

  it('returns every found child in a single array', () => {
    const children1 = mockNodes(4);
    const children2 = mockNodes(2);
    const children3 = mockNodes(1);
    const node = { ...mockElement(), children1, children2, children3 };
    // openingElement is also a child node
    expect(new Set(jsxAstUtils.getChildren(node))).toEqual(
      new Set([...children1, ...children2, ...children3, node.openingElement])
    );
  });
});

describe('findContentRoot', () => {
  it('returns null if a layout tag could not be found', () => {
    const parent = mockElement('p');
    expect(jsxAstUtils.findContentRoot(parent)).toBe(null);
  });

  it('returns the node with tag "MDXLayout" if found', () => {
    const contentRoot = mockElement('MDXLayout');
    const parent = mockElement('p');
    parent.children = [mockElement(), mockElement('p'), contentRoot];
    expect(jsxAstUtils.findContentRoot(parent)).toBe(contentRoot);
  });
});

describe('findTag', () => {
  it('produces expected outputs on basic input set', () => {
    const parent = mockElement('div');
    const p = mockElement('p');
    parent.children = [mockElement('h1'), p, mockElement('React.Fragment')];

    expect(jsxAstUtils.findTag(parent, 'hr', true)).toEqual([]);
    expect(jsxAstUtils.findTag(parent, 'p', true).length).toBe(1);
    expect(jsxAstUtils.findTag(parent, 'p', true)[0]).toBe(p);
  });
});

describe('findNode', () => {
  const createMatcherFor = tag => node =>
    node.type === 'JSXElement' && node.openingElement.name.name === tag;

  it('produces expected outputs on input set', () => {
    const parent = mockElement('p');
    const pMatcher = createMatcherFor('p');
    const hrMatcher = createMatcherFor('hr');
    expect(jsxAstUtils.findNode(parent, () => false, false)).toEqual([]);
    expect(jsxAstUtils.findNode(parent, () => true, false)).toEqual([parent]);
    expect(jsxAstUtils.findNode(parent, hrMatcher, false)).toEqual([]);
    expect(jsxAstUtils.findNode(parent, pMatcher, false)).toEqual([parent]);
  });

  it('navigates children if searchMatchChildren is set', () => {
    const parent = mockElement('p');
    const p = mockElement('p');
    parent.children = [mockElement('h1'), p, mockElement('React.Fragment')];
    const pMatcher = createMatcherFor('p');

    expect(jsxAstUtils.findNode(parent, pMatcher, true).length).toBe(2);
    expect(new Set(jsxAstUtils.findNode(parent, pMatcher, true))).toEqual(
      new Set([parent, p])
    );
  });

  it('does not navigate children if searchMatchChildren is unset', () => {
    const parent = mockElement('p');
    const p = mockElement('p');
    parent.children = [mockElement('h1'), p, mockElement('React.Fragment')];
    const pMatcher = createMatcherFor('p');

    expect(jsxAstUtils.findNode(parent, pMatcher, false).length).toBe(1);
    expect(jsxAstUtils.findNode(parent, pMatcher, false)[0]).toEqual(parent);
  });
});

describe('isJsxElement', () => {
  it('returns false for non-jsx elements', () => {
    expect(jsxAstUtils.isJsxElement(mockText())).toBe(false);
  });

  it('returns true for jsx elements', () => {
    expect(jsxAstUtils.isJsxElement(mockElement())).toBe(true);
  });

  it('returns false for invalid input', () => {
    expect(jsxAstUtils.isJsxElement(null)).toBe(false);
    expect(jsxAstUtils.isJsxElement({})).toBe(false);
    expect(jsxAstUtils.isJsxElement('text')).toBe(false);
  });
});

describe('cleanJsxSnippet', () => {
  it('returns a string without white spaces and trailing semicolons', () => {
    const original = '    return <span>text</span>;      ';
    expect(jsxAstUtils.cleanJsxSnippet(original)).toBe(
      'return <span>text</span>'
    );
  });
});

describe('collapseSpace', () => {
  it('collapses space correctly', () => {
    const original = '   first    word final    ';
    expect(jsxAstUtils.collapseSpace(original)).toBe(' first word final ');
  });

  it('collapses horizontal and vertical space separately', () => {
    const original = '  \n\n second   \n word \n\r\n\r     last\n\n';
    expect(jsxAstUtils.collapseSpace(original)).toBe(
      ' \n second \n word \n last\n'
    );
  });
});

describe('getJsxChildren', () => {
  it('only returns JSX children', () => {
    const children = mockNodes(4);
    const parent = mockElement();
    parent.children = children;

    const get = n => new Set(jsxAstUtils.getJsxChildren(n));
    const expected = new Set(parent.children.filter(jsxAstUtils.isJsxElement));
    expect(get(parent)).toEqual(new Set(expected));
    expect(get(parent)).not.toEqual(new Set(children));
  });
});

describe('reduceNode', () => {
  it('returns empty string for invalid input', () => {
    expect(jsxAstUtils.reduceNode(null)).toBe('');
  });

  it('directly converts string literals without collapsing ever', () => {
    const text = 'example string  ';
    const jsx = `"${text}"`;
    // String literal AST node taken from example AST
    const node = {
      type: 'StringLiteral',
      start: 0,
      // Exclusive end is length plus both quotations
      end: text.length + 2,
      extra: {
        rawValue: text,
        raw: jsx,
      },
      value: text,
    };
    expect(jsxAstUtils.reduceNode(node, false, jsx)).toBe(text);
    expect(jsxAstUtils.reduceNode(node, true, jsx)).toBe(text);
  });

  it('directly converts template strings from JSX without delimiters', () => {
    const tag = 'span';
    const text = 'template string';
    const jsx = `<${tag}>{\`${text}\`}</${tag}>`;
    // Template literal AST node taken from example AST
    // start of template literal (+3 for <, >, and {)
    const start = tag.length + 3;
    const node = {
      type: 'TemplateLiteral',
      start,
      // end of template literal (+2 for both backticks)
      end: start + text.length + 2,
      expressions: [],
      quasis: [
        {
          type: 'TemplateElement',
          // Start of inner value of template literal
          start: start + 1,
          end: start + text.length + 1,
          value: {
            raw: text,
            cooked: text,
          },
          tail: true,
        },
      ],
    };
    expect(jsxAstUtils.reduceNode(node, false, jsx)).toBe(text);
  });

  it('converts all other expressions from their direct JSX', () => {
    const tag = 'hr';
    const node = mockElement('hr');
    const jsx = `<${tag}> mdxType="${tag}" />`;
    node.start = 0;
    node.end = jsx.length;
    expect(jsxAstUtils.reduceNode(node, false, jsx)).toBe(jsx);
  });

  it('does not collapse text when collapse is unset', () => {
    const tag = 'span';
    const text = 'start     text';
    const node = mockText(text);
    const jsx = `<${tag}>${text}</${tag}>`;
    // + 2 from < and >
    node.start = tag.length + 2;
    node.end = text.length + tag.length + 2;
    expect(jsxAstUtils.reduceNode(node, false, jsx)).toBe(text);
  });

  it('does collapse text when collapse is set', () => {
    const tag = 'span';
    const text = 'start     text';
    const node = mockText(text);
    const jsx = `<${tag}>${text}</${tag}>`;
    // + 2 from < and >
    node.start = tag.length + 2;
    node.end = text.length + tag.length + 2;
    expect(jsxAstUtils.reduceNode(node, true, jsx)).toBe('start text');
  });
});
