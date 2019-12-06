import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import SearchBar from './search-bar';

describe('Rendering', () => {
  it('should initialize autocomplete search input and focus on it', async () => {
    const rendered = render(<SearchBar />);

    const input = rendered.queryByLabelText('Search');
    await wait(() => {
      expect(input).toHaveAttribute(
        'aria-owns',
        expect.stringContaining('algolia-autocomplete-listbox')
      );
    });

    // Focus
    input.focus();
    await wait(() => {
      expect(document.activeElement).toEqual(input);
    });
  });
  it('should trigger focus using key binding "/"', async () => {
    const rendered = render(<SearchBar />);

    const input = rendered.queryByLabelText('Search');
    await wait(() => {
      expect(input).toHaveAttribute(
        'aria-owns',
        expect.stringContaining('algolia-autocomplete-listbox')
      );
    });

    // Focus
    fireEvent.keyUp(document.body, { key: '/' });
    await wait(() => {
      expect(document.activeElement).toEqual(input);
    });
  });
});
