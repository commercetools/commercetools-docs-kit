import React from 'react';
import { render } from '@testing-library/react';
import createReactComponent from './html-to-jsx';

describe('converting an HTML string to JSX', () => {
  const codeExamples = [
    `<span class="red">Hello</span>`,
    `<div class="red">
      <span>Hello</span>
      <span class="bold">World</span>
    </div>`,
    `<div data-testid="foo">
      <span>Hello</span>
      <span> </span>
      <span>World</span>
    </div>`,
  ];
  codeExamples.forEach(code => {
    it(`should render React component for ${code}`, () => {
      const Element = createReactComponent(code);
      const rendered = render(<Element />);
      expect(rendered.container.firstChild).toMatchSnapshot();
    });
  });
});
