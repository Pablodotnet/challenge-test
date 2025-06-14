import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { routineSlice } from './routines';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    routines: routineSlice.reducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
