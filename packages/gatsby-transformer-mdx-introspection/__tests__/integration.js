const fs = require('fs');
const path = require('path');
const transformMdx = require('../src/transform-mdx');

// Contains overall integration tests to test plugin functionality

// Utility function to mock default options
const mockOptions = () => ({
  lowercaseIdentifiers: false,
  trimWhitespace: true,
  collapseWhitespace: true,
  attachAST: false,
  removeMdxCompilationArtifacts: true,
  shouldIndexNode: () => true,
  excludeTags: [
    'p',
    'tr',
    'th',
    'td',
    'li',
    'span',
    'em',
    'strong',
    'del',
    'code',
  ],
});

async function introspectMdx(
  mdx,
  options,
  getFirstChild = false,
  desiredProperties = ['children', 'attributes', 'component']
) {
  const result = await transformMdx(mdx, options);

  // Pick desired properties from each node
  function pickProperties(node) {
    if (typeof node === 'string') return node;
    const newNode = {};
    desiredProperties.forEach(prop => {
      if (prop === 'children') {
        newNode.children = node.children.map(pickProperties);
      } else {
        newNode[prop] = node[prop];
      }
    });
    return newNode;
  }
  const picked = pickProperties(result[0]);

  if (getFirstChild) return picked.children[0];
  return picked;
}

// Legacy tests from previous version of plugin (no regression)
describe('legacy test behavior', () => {
  // Set tags to be lowercase for legacy tests (previous behavior)
  const legacyOptions = mockOptions();
  legacyOptions.lowercaseIdentifiers = true;

  it('still passes test 1', async () => {
    // This string was slightly changed, but the previous test wasn't valid JSX
    const mdx = '<ApiType apiKey="test" type="OutOfOrderPropertiesTestType" />';
    expect(await introspectMdx(mdx, legacyOptions, true)).toMatchObject({
      attributes: [
        {
          name: 'apikey',
          value: 'test',
        },
        {
          name: 'type',
          value: 'OutOfOrderPropertiesTestType',
        },
      ],
      component: 'apitype',
    });
  });

  it('still passes test 2', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<div><h3>TODO</h3><TodoList items={this.state.items} /><form onSubmit={this.handleSubmit}><label htmlFor="new-todo">What needs to be done?</label><input id="new-todo" onChange={this.handleChange} value={this.state.text} /> <button>Add #{this.state.items.length + 1}</button></form></div>';
    expect(await introspectMdx(mdx, legacyOptions, true)).toMatchObject({
      component: 'div',
      attributes: [],
    });
  });

  it('still passes test 3', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<ul>{this.props.items.map(item => (<li key={item.id}>{item.text}</li>))}</ul>';
    expect(await introspectMdx(mdx, legacyOptions, true)).toMatchObject({
      attributes: [],
      component: 'ul',
    });
  });

  it('still passes test 4', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<div className="content" dangerouslySetInnerHTML={this.getRawMarkup()} />';
    expect(await introspectMdx(mdx, legacyOptions, true)).toMatchObject({
      attributes: [
        {
          name: 'classname',
          value: 'content',
        },
        {
          name: 'dangerouslysetinnerhtml',
          value: '{this.getRawMarkup()}',
        },
      ],
      component: 'div',
    });
  });
});

describe('gatsby-transformer-mdx-introspection', () => {
  const mdx1 = `
## Sample **title**

Lorem ipsum

---`;

  const tree1 = [
    {
      component: 'h2',
      attributes: [],
      children: [
        'Sample ',
        {
          component: 'strong',
          attributes: [],
          children: ['title'],
        },
      ],
    },
    {
      component: 'p',
      attributes: [],
      children: ['Lorem ipsum'],
    },
    {
      component: 'hr',
      attributes: [],
      children: [],
    },
  ];

  it('parses basic MDX files to expected component tree', async () => {
    const result = await introspectMdx(mdx1, mockOptions());
    expect(result.children).toMatchObject(tree1);
  });

  it('removes frontmatter from document before parsing', async () => {
    const mdx = `
---
frontmatterValue: 0
otherValue: 1
---

${mdx1}
`.trim();

    const result = await introspectMdx(mdx, mockOptions());
    expect(result.children).toMatchObject(tree1);
  });

  it('properly parses complex mdx documents to component trees', async () => {
    const mdx = await fs.promises.readFile(
      path.resolve(__dirname, './complex.mdx.test')
    );
    const result = await introspectMdx(mdx, mockOptions());
    expect(result.children).toMatchObject([
      {
        component: 'h1',
        attributes: [],
        children: [
          '🚀 Getting ',
          { component: 'em', attributes: [], children: ['Started'] },
        ],
      },
      {
        component: 'Alert',
        attributes: [
          { name: 'type', value: 'primary' },
          { name: 'mode', value: 'normal' },
        ],
        children: [
          {
            component: 'p',
            attributes: [],
            children: [
              { component: 'em', attributes: [], children: ['Text content'] },
              // 'inlineCode' is a result of the MDX compilation
              // More details: https://mdxjs.com/getting-started#working-with-components
              { component: 'inlineCode', attributes: [], children: ['here'] },
            ],
          },
        ],
      },
      { component: 'h3', attributes: [], children: ['Complex jsx tag'] },
      {
        component: 'React.Fragment',
        attributes: [],
        children: [
          {
            component: 'Gadget',
            attributes: [
              { name: 'doSomething', value: '{() => true}' },
              { name: 'truthy', value: true },
              { name: 'falsey', value: false },
              { name: 'indirect', value: 'value' },
              { name: 'single', value: 'value' },
              { name: 'template', value: 'text' },
              { name: 'null', value: null },
              { name: 'undef', value: undefined },
              // eslint-disable-next-line no-template-curly-in-string
              { name: 'complexTemplate', value: ' ${substitution} here' },
              { name: 'number', value: 0.7 },
              { name: 'object', value: { a: '7', b: true, c: 0.31 } },
              { name: 'spread', value: true },
              { name: 'json', value: 0 },
              { name: 'nullObj', value: null },
              { name: 'undefObj', value: undefined },
              { name: 'func1', value: 'function () {\n return null;\n }' },
              {
                name: 'func2',
                value: 'function (a) {\n return a.toString();\n }',
              },
              { name: 'func3', value: 'function (arg) {\n return [];\n }' },
              { name: 'func4', value: '(a, b) => a + 3' },
              // eslint-disable-next-line no-template-curly-in-string
              { name: 'template2', value: ' ${substitution} here' },
              { name: 'object2', value: { a: '7', b: true, c: 0.31 } },
            ],
            children: [
              'indirect text child',
              // Newlines come from JSX
              '\n direct text child\n ',
              {
                component: 'span',
                attributes: [],
                children: ['jsx child'],
              },
            ],
          },
        ],
      },
    ]);
  });
});
