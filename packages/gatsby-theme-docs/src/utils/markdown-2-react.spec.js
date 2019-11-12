import React from 'react';
import markdown2React from './markdown-2-react';

describe('markdown2React', () => {
  it('should return a react component from a markdown string', async () => {
    const markdownString = '# This is a markdown title';
    const expectedReactElement = React.createElement('h1', { key: 'h-1' }, [
      'This is a markdown title',
    ]);

    expect(markdown2React(markdownString)).toEqual(expectedReactElement);
  });
});
