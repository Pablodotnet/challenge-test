import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { clientsSlice } from './clients';
import { sidebarSlice, themeSlice } from './theme';
import { conversationsSlice } from './conversations';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    clients: clientsSlice.reducer,
    conversations: conversationsSlice.reducer,
    theme: themeSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
