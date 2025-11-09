import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import blogReducer from './blogSlice';
import { blogSaga } from './blogSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(blogSaga);