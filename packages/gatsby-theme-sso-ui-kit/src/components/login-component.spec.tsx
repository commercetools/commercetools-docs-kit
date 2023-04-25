import { render, screen, fireEvent } from '@testing-library/react';
import LoginButton from './login-button';
import React from 'react';

const mockLoginWithRedirect = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: mockLoginWithRedirect,
  }),
}));

describe('login-button', () => {
  const DEFAULT_LABEL = 'Log In';
  it('should render login-component with default text if no label is specified', () => {
    render(<LoginButton />);
    const loginButtonElement = screen.getByTestId('login-button');
    expect(loginButtonElement).toBeInTheDocument();
    expect(loginButtonElement).toHaveTextContent(DEFAULT_LABEL);
  });

  it('should render login-component with specified label', () => {
    const label = 'Click me please!';
    render(<LoginButton label={label} />);
    const loginButtonElement = screen.getByTestId('login-button');
    expect(loginButtonElement).toBeInTheDocument();
    expect(loginButtonElement).toHaveTextContent(label);
  });

  it('should render the default icon if no icon is specified', () => {
    render(<LoginButton />);
    const defaultIcon = screen.getByTestId('default-icon');
    expect(defaultIcon).toBeInTheDocument();
  });

  it('should render the specified icon', () => {
    const CusotomIcon = () => {
      return <div data-testid="custom-icon"></div>;
    };
    render(<LoginButton icon={<CusotomIcon />} />);
    const defaultIcon = screen.getByTestId('custom-icon');
    expect(defaultIcon).toBeInTheDocument();
  });

  it('should invoke loginWithRedirect with the expected url when clicked', () => {
    const expectedLoginWithRedirect = {
      appState: {
        returnTo: '/',
      },
    };
    render(<LoginButton />);
    const loginButtonElement = screen.getByTestId('login-button');
    expect(loginButtonElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement);
    expect(mockLoginWithRedirect).toHaveBeenCalledWith(
      expectedLoginWithRedirect
    );
  });
});
