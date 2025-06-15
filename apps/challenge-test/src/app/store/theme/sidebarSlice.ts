import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarActive: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarActive = !state.isSidebarActive;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

// To be used as selector
export const getIsSidebarDisplayed = (state: {
  sidebar: typeof initialState;
}) => state.sidebar.isSidebarActive;
