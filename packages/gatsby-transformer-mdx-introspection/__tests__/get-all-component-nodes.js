const getAllComponentNodes = require('../src/get-all-component-nodes');

describe('get-all-component-nodes.js', () => {
  const mockTree = () => ({
    component: 'div',
    attributes: [],
    hasGatsbyNode: true,
    jsx: '',
    astNode: null,
    children: [
      {
        component: 'h2',
        attributes: [],
        hasGatsbyNode: true,
        jsx: '',
        astNode: null,
        children: [
          'Sample ',
          {
            component: 'strong',
            attributes: [],
            hasGatsbyNode: true,
            jsx: '',
            astNode: null,
            children: ['title'],
          },
        ],
      },
      {
        component: 'p',
        attributes: [],
        hasGatsbyNode: true,
        jsx: '',
        astNode: null,
        children: ['Lorem ipsum'],
      },
      {
        component: 'hr',
        attributes: [],
        hasGatsbyNode: true,
        jsx: '',
        astNode: null,
        children: [],
      },
    ],
  });

  it('gets all component nodes from a simple tree', () => {
    const tree = mockTree();
    const expected = [
      tree, // div
      tree.children[0], // h2
      tree.children[0].children[1], // h2 > strong
      tree.children[1], // p
      tree.children[2], // hr
    ];
    expect(getAllComponentNodes(tree)).toEqual(expected);
  });

  it('ignores nodes set to "hasGatsbyNode: false, but still traverses their children', () => {
    const tree = mockTree();
    // set root node to not have node
    tree.hasGatsbyNode = false;
    const expected = [
      tree.children[0], // h2
      tree.children[0].children[1], // h2 > strong
      tree.children[1], // p
      tree.children[2], // hr
    ];
    expect(getAllComponentNodes(tree)).toEqual(expected);
  });
});
