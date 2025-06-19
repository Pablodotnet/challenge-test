import { render } from '@testing-library/react';
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
});
