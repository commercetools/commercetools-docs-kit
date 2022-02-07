import React from 'react';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import useISO310NumberFormatter from './use-iso310-number-formatter';

const TestComponent = (props: { value: number }) => {
  const formatNumber = useISO310NumberFormatter();
  return <div>Number: {formatNumber(props.value)}</div>;
};

describe('formatter', () => {
  it('should format number according to ISO 31-0 spec', async () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <TestComponent value={1000000.99999} />
      </IntlProvider>
    );

    await screen.findByText('Number: 1 000 000.99999');
  });
});
