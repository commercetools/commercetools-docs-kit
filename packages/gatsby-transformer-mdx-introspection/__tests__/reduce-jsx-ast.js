const reduceJsxAst = require('../src/reduce-jsx-ast');

// Tests reduceChildren from reduce-jsx-ast.js
// Note: most methods are too intertwined to effectifely unit test (or require
// complex Babel AST mocking). As such, integration tests covering the rest of
// reduce-jsx-ast are available in ./integration.js

describe('reduceChildren', () => {
  it('removes whitespace-only children', () => {
    const text = 'text node';
    const hr = {
      component: 'hr',
      attributes: [],
      children: [],
    };
    const children = ['     \n\n   \n ', text, hr, '     \n   \n '];
    const expected = [text, hr];
    expect(
      reduceJsxAst.reduceChildren(children, {
        trimWhitespace: false,
        collapseWhitespace: false,
      })
    ).toEqual(expected);
  });

  it('trims text on elements only when set', () => {
    const text1 = 'text';
    const text2 = '     text 2    ';
    expect(
      reduceJsxAst.reduceChildren([text1, text2], {
        trimWhitespace: true,
        collapseWhitespace: false,
      })
      // Won't left-trim text 2 since it isn't the last child
    ).toEqual([text1, '     text 2']);
    expect(
      reduceJsxAst.reduceChildren([text1, text2], {
        trimWhitespace: false,
        collapseWhitespace: false,
      })
    ).toEqual([text1, text2]);
  });

  it('collapses text on elements only when set', () => {
    const text1 = 'text';
    const text2 = 'text   \n\n 2  string';
    expect(
      reduceJsxAst.reduceChildren([text1, text2], {
        trimWhitespace: false,
        collapseWhitespace: true,
      })
    ).toEqual([text1, 'text \n 2 string']);
    expect(
      reduceJsxAst.reduceChildren([text1, text2], {
        trimWhitespace: false,
        collapseWhitespace: false,
      })
    ).toEqual([text1, text2]);
  });
});
