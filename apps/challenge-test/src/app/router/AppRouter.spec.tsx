import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { useCheckAuth } from '../hooks';

// Mock components
jest.mock('../ui/components/CheckingAuth', () => ({
  CheckingAuth: () => <div>CheckingAuth...</div>,
}));
jest.mock('../auth/routes/AuthRoutes', () => ({
  AuthRoutes: () => <div>AuthRoutes Component</div>,
}));
jest.mock('../dashboard/routes/DashboardRoutes', () => ({
  DashboardRoutes: () => <div>DashboardRoutes Component</div>,
}));
jest.mock('../hooks', () => ({
  useCheckAuth: jest.fn(),
}));
const mockUseCheckAuth = useCheckAuth as jest.MockedFunction<
  typeof useCheckAuth
>;

describe('AppRouter', () => {
  const setMockUseCheckAuth = (status: string) => {
    mockUseCheckAuth.mockReturnValue({ status });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show CheckingAuth while status is "checking"', () => {
    setMockUseCheckAuth('checking');

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CheckingAuth...')).toBeInTheDocument();
  });

  test('should show DashboardRoutes if authenticated', () => {
    setMockUseCheckAuth('authenticated');

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('DashboardRoutes Component')).toBeInTheDocument();
  });

  test('should show AuthRoutes if not-authenticated', () => {
    setMockUseCheckAuth('not-authenticated');

    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('AuthRoutes Component')).toBeInTheDocument();
  });

  test('should redirect to /auth/login if path is unknown and not-authenticated', () => {
    setMockUseCheckAuth('not-authenticated');

    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
          <Route path="/auth/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
