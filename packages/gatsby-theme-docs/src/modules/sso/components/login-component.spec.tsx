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
  it('should invoke loginWithRedirect with the expected url when clicked', () => {
    const expectedLoginWithRedirect = {
      appState: {
        returnTo: '/',
      },
    };
    render(<LoginButton theme="secondary" label="Log in" />);
    const loginButtonElement = screen.getByTestId('avatar-login-button');
    expect(loginButtonElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement);
    expect(mockLoginWithRedirect).toHaveBeenCalledWith(
      expectedLoginWithRedirect
    );
  });
});
