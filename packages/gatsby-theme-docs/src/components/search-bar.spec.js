import React from 'react';
import { render, wait } from '@testing-library/react';
import SearchBar from './search-bar';

describe('Rendering', () => {
  it('should initialize autocomplete search input', async () => {
    const rendered = render(<SearchBar />);

    await wait(() => {
      expect(rendered.queryByLabelText('Search')).toHaveAttribute(
        'aria-owns',
        'algolia-autocomplete-listbox-0'
      );
    });
  });
});
