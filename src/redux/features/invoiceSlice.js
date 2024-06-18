 import {  createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoice: null,
    numeroControl: null,
    error: null,
    loading: false, 
  },
  reducers: {
    addInvoice: (state, action) => {
      state.invoice = {
        invoiceData: action.payload.invoiceData,
        itemData: action.payload.itemData,
      };
    },

    setProducts: (state, action) => {
      state.items = action.payload;
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    resetInvoice: (state) => {
      state.invoice = null;
      state.numeroControl= null;
    },
    setNumeroControl: (state, action) => {
      state.numeroControl = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addInvoice,
  deleteProdut,
  editProduct,
  resetInvoice,
  setError,
  setNumeroControl,
  setProducts,
  setSearchResults,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
