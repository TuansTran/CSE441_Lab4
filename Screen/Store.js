import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './Slice';

const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;
