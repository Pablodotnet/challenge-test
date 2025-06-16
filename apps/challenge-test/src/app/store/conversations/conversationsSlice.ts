import { createSlice } from '@reduxjs/toolkit';

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    index: [],
  },
  reducers: {
    setConversationsIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setConversationsIndex } = conversationsSlice.actions;
