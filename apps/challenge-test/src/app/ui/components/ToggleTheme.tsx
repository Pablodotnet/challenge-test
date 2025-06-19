import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/theme';
import { RootState } from '../../store';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton aria-label="toggle theme" onClick={handleToggle}>
      {isDarkMode ? (
        <DarkModeIcon></DarkModeIcon>
      ) : (
        <LightModeIcon></LightModeIcon>
      )}
    </IconButton>
  );
};
