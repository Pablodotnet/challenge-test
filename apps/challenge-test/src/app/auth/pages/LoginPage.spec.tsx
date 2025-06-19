import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { startLoginWithEmailPassword, startGoogleSignIn } from '../../store';
import { LoginPage } from './LoginPage';
import makeStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Mock hooks and actions
jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
  useForm: jest.fn(),
}));

jest.mock('../../store', () => ({
  startGoogleSignIn: jest.fn(),
  startLoginWithEmailPassword: jest.fn(),
}));

const mockStore = makeStore([]);

describe('LoginPage', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      status: 'idle',
      errorMessage: '',
    });
    (useForm as jest.Mock).mockReturnValue({
      email: 'test@example.com',
      password: '123456',
      onInputChange: jest.fn(),
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderWithStore = (storeState: any) => {
    const store = mockStore({
      theme: {
        isDarkMode: false,
      },
      ...storeState
    });
    store.dispatch = mockDispatch;

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/auth/login']}>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render the login form correctly', () => {
    renderWithStore({ auth: { status: 'idle', errorMessage: '' } });
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('should dispatch startLoginWithEmailPassword on form submit', () => {
    renderWithStore({ auth: { status: 'idle', errorMessage: '' } });

    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith(
      startLoginWithEmailPassword({
        email: 'test@example.com',
        password: '123456',
      })
    );
  });

  test('should dispatch startGoogleSignIn on Google button click', () => {
    renderWithStore({ auth: { status: 'idle', errorMessage: '' } });

    const googleButton = screen.getByTestId('google-button');
    fireEvent.click(googleButton);

    expect(mockDispatch).toHaveBeenCalledWith(startGoogleSignIn());
  });

  test('should show error message if errorMessage exists', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      status: 'idle',
      errorMessage: 'Invalid credentials',
    });
    renderWithStore({
      auth: { status: 'idle', errorMessage: 'Invalid credentials' },
    });
    const alert = screen.getByTestId('error-message-container');
    expect(alert).toBeInTheDocument();
  });

  test('should disable buttons when isAuthenticating is true', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      status: 'checking',
      errorMessage: '',
    });
    renderWithStore({ auth: { status: 'checking', errorMessage: '' } });

    expect(screen.getByTestId('login-button')).toBeDisabled();
    expect(screen.getByTestId('google-button')).toBeDisabled();
  });
});
