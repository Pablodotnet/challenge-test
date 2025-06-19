import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckingAuth } from './CheckingAuth';

describe('CheckingAuth component', () => {
  test('renders without crashing', () => {
    render(<CheckingAuth />);
    // Verify the progress indicator is in the document
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('has correct container styles', () => {
    const { container } = render(<CheckingAuth />);
    const outerGrid = container.querySelector('.MuiGrid-container');

    // Check if outer Grid has correct inline styles
    expect(outerGrid).toHaveStyle({
      minHeight: '100vh',
      padding: '32px', // 4 * 8px default MUI spacing unit
    });
  });
});
