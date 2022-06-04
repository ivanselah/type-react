import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';
import todoReducer from './todo';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;
