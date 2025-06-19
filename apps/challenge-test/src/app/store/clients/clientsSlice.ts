import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const { setClients } = clientsSlice.actions;
