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
  const DEFAULT_LABEL = 'Login';
  it('should render login-component with default text if no label is specified', () => {
    render(<LoginButton />);
    const loginButtonElement = screen.getByTestId('login-button');
    expect(loginButtonElement).toBeInTheDocument();
    expect(loginButtonElement).toHaveTextContent(DEFAULT_LABEL);
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
