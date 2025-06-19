import React from 'react';
import { render } from '@testing-library/react';
import { AppTheme } from './AppTheme';
import { Provider } from 'react-redux';
import makeStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockStore = makeStore([]);

describe('AppTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithStore = (isDarkMode: boolean) => {
    const store = mockStore({
      theme: {
        isDarkMode,
      },
    });

    return render(
      <Provider store={store}>
        <AppTheme>
          <div data-testid="child">Test Child</div>
        </AppTheme>
      </Provider>
    );
  };

  it('renders children correctly', () => {
    const { getByTestId } = renderWithStore(false);
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('applies light mode theme on localstorage when isDarkMode is false', () => {
    renderWithStore(false);
    expect(localStorage.getItem('isDarkMode')).toBe('false');
  });

  it('applies dark mode theme on localstorage when isDarkMode is true', () => {
    renderWithStore(true);
    expect(localStorage.getItem('isDarkMode')).toBe('true');
  });
});
