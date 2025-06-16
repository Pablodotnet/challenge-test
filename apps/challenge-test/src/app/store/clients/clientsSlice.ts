import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    active: null,
  },
  reducers: {
    setActiveClient: (state, action) => {
      state.active = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const {
  setActiveClient,
  setClients,
} = clientsSlice.actions;
