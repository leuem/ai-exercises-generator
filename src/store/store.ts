import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from './dummy-api/dummy.api';
import { gptApi } from './gpt-api/gpt.api';

export const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
    [gptApi.reducerPath]: gptApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware, gptApi.middleware),
});
