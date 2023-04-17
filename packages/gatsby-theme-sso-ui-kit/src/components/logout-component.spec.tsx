import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './logout-button';

const mockLogout = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: mockLogout,
  }),
}));

describe('logout-button', () => {
  const DEFAULT_LABEL = 'Log out';
  it('should render logout-component with specified text', () => {
    render(<LogoutButton />);
    const logoutButtonElement = screen.getByTestId('logout-button');
    expect(logoutButtonElement).toBeInTheDocument();
    expect(logoutButtonElement).toHaveTextContent(DEFAULT_LABEL);
  });

  it('should invoke logout with the expected url when clicked', () => {
    const expectedLogout = {
      logoutParams: {
        returnTo:
          'http://localhost/api/logout?redirect=http%3A%2F%2Flocalhost%2F',
      },
    };
    render(<LogoutButton />);
    const logoutButtonElement = screen.getByTestId('logout-button');
    expect(logoutButtonElement).toBeInTheDocument();
    fireEvent.click(logoutButtonElement);
    expect(mockLogout).toBeCalledWith(expectedLogout);
  });
});
