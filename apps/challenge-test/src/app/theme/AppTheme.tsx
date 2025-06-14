import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type AppThemeProps = {
  children: JSX.Element | JSX.Element[];
};

export const AppTheme = ({ children }: AppThemeProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light'
        }
    })}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
