import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { getToken } from '../../api/token';
import { ConfigurationInitState } from './configuration-init-state.interface.ts';
import { getErrorMessage } from '../../shared/get-error-message.function.ts';
import { getUrlSearchParameter } from '../../shared/get-url-search-parameter.function.ts';
import { selectCustomizationConfig } from '@src/redux/customization-config';

export const createToken = createAsyncThunk(
  'token/fetch',
  async (
    parameters: {
      tokenFromUrl?: string;
    },
    thunkAPI,
  ) => {
    try {
      if (parameters.tokenFromUrl) {
        thunkAPI.dispatch(setToken(parameters.tokenFromUrl));
        return;
      }

      const state = thunkAPI.getState() as RootState;

      const {
        isPaymentMethodsListMode,
        showFirstScreenCommunication,
        showPaymentFormCommunication,
      } = selectCustomizationConfig(state);

      const sandbox = selectIsSandbox(state);

      const requestParams = {
        sandbox: !!sandbox,
        isPaymentMethodsListMode: isPaymentMethodsListMode,
        showFirstScreenCommunication: showFirstScreenCommunication,
        showPaymentFormCommunication: showPaymentFormCommunication,
      };

      const response = await getToken(requestParams);
      const token = response;

      thunkAPI.dispatch(setToken(token));

      return response;
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState: ConfigurationInitState = {
  token: getUrlSearchParameter('token'),
  sandbox: getUrlSearchParameter('sandbox'),
  isFetching: false,
  tokenGenerated: false,
};

const tokenConfigurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.tokenGenerated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createToken.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createToken.fulfilled, (state, action) => {
        state.isFetching = false;
        state.token = action.payload as string;
        state.tokenGenerated = true;
      })
      .addCase(createToken.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setToken } = tokenConfigurationSlice.actions;

export const selectToken = (state: RootState) => state.tokenConfigurationSlice.token;
export const selectTokenIsFetching = (state: RootState) => state.tokenConfigurationSlice.isFetching;
export const selectIsSandbox = (state: RootState) => state.tokenConfigurationSlice.sandbox;
export const selectTokenGenerated = (state: RootState) =>
  state.tokenConfigurationSlice.tokenGenerated;

export default tokenConfigurationSlice.reducer;
