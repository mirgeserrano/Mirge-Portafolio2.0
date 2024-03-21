import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoice: null,
  },
  reducers: {
    addInvoice: (state, action) => {
      state.invoice = {
        invoiceData: action.payload.invoiceData,
        itemData: action.payload.itemData,
      };
    },

    deleteProdut: (state, action) => {
      console.log(state, action);
      const productId = action.payload;
      return state.filter((product) => product.id !== productId);
    },

    editProduct: (state, action) => {
      const { id, codinst, codprod, descrip } = action.payload;
      const foundTask = state.find((product) => product.id === id);
      if (foundTask) {
        foundTask.codinst = codinst;
        foundTask.codprod = codprod;
        foundTask.descrip = descrip;
      }
    },

    setProducts: (state, action) => {
      state.items = action.payload;
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    resetInvoice: (state,) => {
      state.invoice= null;
    },
  },
});

export const {
  addInvoice,
  deleteProdut,
  editProduct,
  setProducts,
  setSearchResults,
  resetInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
