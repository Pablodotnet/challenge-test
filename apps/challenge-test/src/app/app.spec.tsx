import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './app';
import { store } from './store';

jest.mock('firebase/auth', () => {
  return {
    GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
    getAuth: jest.fn(() => ({
      currentUser: null,
      signOut: jest.fn(),
    })),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback(null);
      return () => {};
    }),
  };
});

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display Login title on /auth/login route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/auth/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const authTitle = screen.getByTestId('auth-title');
    expect(authTitle).toHaveTextContent('Login');
  });
});
