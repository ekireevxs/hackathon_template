import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

const initialState = {
  showFirstScreenCommunication: false,
  isPaymentMethodsListMode: false,
  showPaymentFormCommunication: false,
};

const customizationConfigSlice = createSlice({
  name: 'customization-config',
  initialState,
  reducers: {
    setShowFirstCommunication: (state, action: PayloadAction<boolean>) => {
      state.showFirstScreenCommunication = action.payload;
    },
    setPaymentListMode: (state, action: PayloadAction<boolean>) => {
      state.isPaymentMethodsListMode = action.payload;
    },
    setShowPaymentFormCommunication: (state, action: PayloadAction<boolean>) => {
      state.showPaymentFormCommunication = action.payload;
    },
  },
});

export const { setShowFirstCommunication, setPaymentListMode, setShowPaymentFormCommunication } =
  customizationConfigSlice.actions;

export const selectCustomizationConfig = (state: RootState) => state.customizationConfigSlice;

export default customizationConfigSlice.reducer;
