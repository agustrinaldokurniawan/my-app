import {configureStore} from '@reduxjs/toolkit';
import articleReducer from './Reducers/article';

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
