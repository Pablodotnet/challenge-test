import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

// Mocking the ToggleTheme component
jest.mock('../../ui', () => ({
  ToggleTheme: () => <div data-testid="toggle-theme" />,
}));

describe('AuthLayout Component', () => {
  const mockTitle = 'Test Title';
  const mockChildText = 'This is a child element';

  const renderComponent = () =>
    render(
      <AuthLayout title={mockTitle}>
        <div>{mockChildText}</div>
      </AuthLayout>
    );

  test('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('auth-title')).toBeInTheDocument();
  });

  test('displays the provided title', () => {
    renderComponent();
    expect(screen.getByTestId('auth-title')).toHaveTextContent(mockTitle);
  });

  test('renders children inside the layout', () => {
    renderComponent();
    expect(screen.getByText(mockChildText)).toBeInTheDocument();
  });

  test('renders the ToggleTheme component', () => {
    renderComponent();
    expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
  });
});
