import { configureStore } from '@reduxjs/toolkit';
import textBoxReducer from './redux/textBoxSlice';

const store = configureStore({
  reducer: {
    textBoxes: textBoxReducer,
  },
});

export default store;
