import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('isDarkMode');
  return {
    isDarkMode: storedTheme ? storedTheme === 'true' : false,
  };
};

const initialState = {
  isDarkMode: getInitialTheme().isDarkMode,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
