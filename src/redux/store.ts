import { configureStore } from '@reduxjs/toolkit';
import tokenConfigurationSlice from './token-configuration';
import customizationConfigSlice from './customization-config';

export const store = configureStore({
  reducer: {
    tokenConfigurationSlice,
    customizationConfigSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
