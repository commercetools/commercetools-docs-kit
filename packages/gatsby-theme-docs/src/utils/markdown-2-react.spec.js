import React from 'react';
import markdown2React from './markdown-2-react';

describe('markdown2React', () => {
  it('should return a react component from a markdown string', async () => {
    const markdownString = '# This is a markdown title';
    expect(React.isValidElement(markdown2React(markdownString))).toBeTruthy();
  });
});
