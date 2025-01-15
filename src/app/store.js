// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/services/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
