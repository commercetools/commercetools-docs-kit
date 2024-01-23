import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import SearchDialog from './search-dialog';

const createTestProps = (custom) => ({
  onClose: jest.fn(),
  ...custom,
});

describe('Rendering', () => {
  it('should initialize autocomplete search input and focus on it', async () => {
    const props = createTestProps();
    const rendered = render(<SearchDialog {...props} />);

    const input = await rendered.findByLabelText('Search');
    await waitFor(() => {
      expect(input).toHaveAttribute(
        'aria-owns',
        expect.stringContaining('algolia-autocomplete-listbox')
      );
    });

    // Focus
    act(() => {
      input.focus();
    });
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.activeElement).toEqual(input);
    });
  });
  it('should trigger focus using key binding "/"', async () => {
    const props = createTestProps();
    const rendered = render(<SearchDialog {...props} />);

    const input = await rendered.findByLabelText('Search');
    await waitFor(() => {
      expect(input).toHaveAttribute(
        'aria-owns',
        expect.stringContaining('algolia-autocomplete-listbox')
      );
    });

    // Focus
    fireEvent.keyUp(document.body, { key: '/' });
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.activeElement).toEqual(input);
    });
  });
  it('should dismiss dialog when clicking on "escape" key', async () => {
    const props = createTestProps();
    const rendered = render(<SearchDialog {...props} />);

    const input = await rendered.findByLabelText('Search');
    await waitFor(() => {
      expect(input).toHaveAttribute(
        'aria-owns',
        expect.stringContaining('algolia-autocomplete-listbox')
      );
    });

    // Dismiss
    fireEvent.keyUp(document.body, { key: 'escape' });
    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
