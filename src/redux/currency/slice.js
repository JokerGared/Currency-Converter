import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency, fetchExchangeInfo } from './operations';

const initialState = {
  baseCurrency: '',
  isLoading: false,
  error: null,
  exchangeInfo: null,
};

const slice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchExchangeInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = payload;
      }),
});
export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;
