import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './logout-button';

const mockLogout = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: mockLogout,
  }),
}));

describe('logout-button', () => {
  const DEFAULT_LABEL = 'Log Out';
  it('should render logout-component with default text if no label is specified', () => {
    render(<LogoutButton />);
    const logoutButtonElement = screen.getByTestId('logout-button');
    expect(logoutButtonElement).toBeInTheDocument();
    expect(logoutButtonElement).toHaveTextContent(DEFAULT_LABEL);
  });

  it('should render logout-component with specified label', () => {
    const label = 'Click me please!';
    render(<LogoutButton label={label} />);
    const logoutButtonElement = screen.getByTestId('logout-button');
    expect(logoutButtonElement).toBeInTheDocument();
    expect(logoutButtonElement).toHaveTextContent(label);
  });

  it('should render the default icon if no icon is specified', () => {
    render(<LogoutButton />);
    const defaultIcon = screen.getByTestId('default-icon');
    expect(defaultIcon).toBeInTheDocument();
  });

  it('should render the specified icon', () => {
    const CusotomIcon = () => {
      return <div data-testid="custom-icon"></div>;
    };
    render(<LogoutButton icon={<CusotomIcon />} />);
    const customIcon = screen.getByTestId('custom-icon');
    expect(customIcon).toBeInTheDocument();
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
    expect(mockLogout).toHaveBeenCalledWith(expectedLogout);
  });
});
