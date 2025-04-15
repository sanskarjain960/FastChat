import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: messageReducer,
  },
});
