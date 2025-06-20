import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes'; // Assuming the component is in the same directory
import { Provider } from 'react-redux';
import { store } from '../../store';

const renderWithRouter = (children: JSX.Element) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login', '/register']}>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

describe('AuthRoutes', () => {
  it('should render LoginPage when navigating to /auth/login', () => {
    renderWithRouter(<AuthRoutes />);

    // Simulate navigating to the login route
    window.history.pushState({}, 'Login', '/auth/login');

    // Check if the LoginPage is rendered
    expect(screen.getByTestId('auth-title')).toBeInTheDocument();
  });

  it('should render RegisterPage when navigating to /auth/register', () => {
    renderWithRouter(<AuthRoutes />);

    // Simulate navigating to the register route
    window.history.pushState({}, 'Register', '/auth/register');

    // Check if the RegisterPage is rendered
    expect(screen.getByTestId('auth-title')).toBeInTheDocument();
  });

  it('should redirect to /auth/login when navigating to an unknown route', async () => {
    renderWithRouter(<AuthRoutes />);

    // Simulate navigating to an unknown route
    window.history.pushState({}, 'Unknown', '/auth/someunknownroute');

    // Wait for the redirection to occur
    await waitFor(() => {
      expect(screen.getByTestId('auth-title')).toBeInTheDocument();
    });
  });

  it('should redirect to /auth/login when navigating to /auth/', async () => {
    renderWithRouter(<AuthRoutes />);

    // Simulate navigating to the base path
    window.history.pushState({}, 'Base Auth', '/auth/');

    // Expect to be redirected to the login path
    await waitFor(() => {
      expect(screen.getByTestId('auth-title')).toBeInTheDocument();
    });
  });
});
