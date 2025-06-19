import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleTheme } from './ToggleTheme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/theme';

// Mocking necessary hooks and actions
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../store/theme', () => ({
  toggleTheme: jest.fn(),
}));

describe('ToggleTheme Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('renders DarkModeIcon when isDarkMode is true', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ theme: { isDarkMode: true } })
    );

    render(<ToggleTheme />);

    expect(screen.getByTestId('toggle-theme-btn')).toBeInTheDocument();
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
  });

  it('renders LightModeIcon when isDarkMode is false', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ theme: { isDarkMode: false } })
    );

    render(<ToggleTheme />);

    expect(screen.getByTestId('toggle-theme-btn')).toBeInTheDocument();
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });

  it('dispatches toggleTheme when button is clicked', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ theme: { isDarkMode: false } })
    );

    render(<ToggleTheme />);
    fireEvent.click(screen.getByTestId('toggle-theme-btn'));

    expect(mockDispatch).toHaveBeenCalledWith(toggleTheme());
  });
});
