const fs = require('fs');
const path = require('path');
const transformMdx = require('../src/transform-mdx');

// Contains overall integration tests to test plugin functionality

// Utility function to mock default options
const createTestPluginOptions = () => ({
  cleanWhitespace: true,
  removeMdxCompilationArtifacts: true,
  shouldIndexNode: () => true,
  // This whitelist is an example of a blacklist that can be used for
  // thorough parsing of a component tree. `p` and `span` are excluded
  // due to being generally insignificant, and `MDXLayout` is excluded
  // because it is always the root of the primary component tree
  tagWhitelist: [/^(?!(?:MDXLayout)|(?:p)|(?:span)).*$/],
});

async function introspectMdx(
  mdx,
  options,
  getFirstTree = true,
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

  if (getFirstTree) {
    return pickProperties(result[0]);
  }

  return result.map(pickProperties);
}

// Legacy tests from previous version of plugin (no regression)
describe('legacy test behavior', () => {
  const legacyOptions = createTestPluginOptions();
  it('still passes test 1', async () => {
    // This string was slightly changed, but the previous test wasn't valid JSX
    const mdx = '<ApiType apiKey="test" type="OutOfOrderPropertiesTestType" />';
    const result = await introspectMdx(mdx, legacyOptions);
    expect(result.children[0]).toMatchObject({
      attributes: [
        {
          name: 'apiKey',
          value: 'test',
        },
        {
          name: 'type',
          value: 'OutOfOrderPropertiesTestType',
        },
      ],
      component: 'ApiType',
    });
  });

  it('still passes test 2', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<div><h3>TODO</h3><TodoList items={this.state.items} /><form onSubmit={this.handleSubmit}><label htmlFor="new-todo">What needs to be done?</label><input id="new-todo" onChange={this.handleChange} value={this.state.text} /> <button>Add #{this.state.items.length + 1}</button></form></div>';
    const result = await introspectMdx(mdx, legacyOptions);
    expect(result.children[0]).toMatchObject({
      component: 'div',
      attributes: [],
    });
  });

  it('still passes test 3', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<ul>{this.props.items.map(item => (<li key={item.id}>{item.text}</li>))}</ul>';
    const result = await introspectMdx(mdx, legacyOptions);
    expect(result.children[0]).toMatchObject({
      attributes: [],
      component: 'ul',
    });
  });

  it('still passes test 4', async () => {
    // a full example from the react JS homepage, should not throw parse errors
    const mdx =
      '<div className="content" dangerouslySetInnerHTML={this.getRawMarkup()} />';
    const result = await introspectMdx(mdx, legacyOptions);
    expect(result.children[0]).toMatchObject({
      attributes: [
        {
          name: 'className',
          value: 'content',
        },
        {
          name: 'dangerouslySetInnerHTML',
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

  const expectedTree1 = [
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
    const result = await introspectMdx(mdx1, createTestPluginOptions());
    expect(result.children).toMatchObject(expectedTree1);
  });

  it('removes frontmatter from document before parsing', async () => {
    const mdx = `
---
frontmatterValue: 0
otherValue: 1
---

${mdx1}
`.trim();

    const result = await introspectMdx(mdx, createTestPluginOptions());
    expect(result.children).toMatchObject(expectedTree1);
  });

  it('properly parses complex mdx documents to component trees', async () => {
    const mdx = fs.readFileSync(path.resolve(__dirname, './complex.mdx.test'));
    const result = await introspectMdx(mdx, createTestPluginOptions());
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

  it('includes simple detached trees as additional nodes in the output', async () => {
    const mdx = `
<div>
  {/* IIFE example */}
  {(function (){
      return <h1 id="internal">I'm inside an IIFE!</h1>;
  })()}
</div>`;

    const result = await introspectMdx(mdx, createTestPluginOptions(), false);
    expect(result).toMatchObject([
      // Root document node
      {
        component: 'MDXLayout',
        attributes: expect.any(Array),
        children: [
          {
            component: 'div',
            attributes: [],
            children: [
              // MDX -> JSX simplifies JSX
              `function () {\n return <h1 id="internal">I'm inside an IIFE!</h1>;\n }()`,
            ],
          },
        ],
      },
      // Detached head node
      {
        component: 'h1',
        attributes: [{ name: 'id', value: 'internal' }],
        children: ["I'm inside an IIFE!"],
      },
    ]);
  });

  it('includes all found detached heads as additional nodes in the output', async () => {
    const mdx = fs.readFileSync(path.resolve(__dirname, './detached.mdx.test'));
    const result = await introspectMdx(mdx, createTestPluginOptions(), false);
    expect(result).toMatchObject([
      // Root document node
      {
        component: 'MDXLayout',
        attributes: expect.any(Array),
        children: [
          {
            component: 'h1',
            attributes: [],
            children: [
              `Detached head `,
              {
                component: 'strong',
                attributes: [],
                children: [`example`],
              },
            ],
          },
          {
            component: 'a',
            attributes: [
              { name: 'href', value: 'https://google.com/' },
              {
                name: 'children',
                // MDX -> JSX adds newlines and simplifies JSX
                value:
                  '{function iife() {\n return <><span>link <em>content</em></span></>;\n }()}',
              },
            ],
            children: [],
          },
          {
            component: 'div',
            attributes: [
              {
                name: 'children',
                // MDX -> JSX simplifies and formats JSX
                value:
                  '{[1, 2, 3].map(i => <span key={i}>child no. {i}</span>)}',
              },
            ],
            children: [],
          },
          {
            component: 'span',
            attributes: [],
            children: [
              {
                component: 'div',
                attributes: [{ name: 'className', value: 'not_detached' }],
                children: [`This doesn't get detached`],
              },
              {
                component: 'h3',
                attributes: [],
                children: [`Neither does this`],
              },
              // MDX -> JSX adds newlines and simplifies JSX
              `(() => {\n return <h1>This does</h1>;\n })()`,
            ],
          },
        ],
      },
      // Detached head nodes
      {
        component: 'React.Fragment',
        attributes: [],
        children: [
          {
            component: 'span',
            attributes: [],
            children: [
              'link ',
              {
                component: 'em',
                attributes: [],
                children: ['content'],
              },
            ],
          },
        ],
      },
      {
        component: 'span',
        attributes: [{ name: 'key', value: '{i}' }],
        children: [`child no. `, `i`],
      },
      {
        component: 'h1',
        attributes: [],
        children: [`This does`],
      },
    ]);
  });
});
