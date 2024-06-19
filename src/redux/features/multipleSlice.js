
import { createSlice } from '@reduxjs/toolkit';
import  { getInvoiceFibre }  from "../../hooks/useApiFibre";
import { Emision } from '../../hooks';
import { handleAsyncActions } from '../../helpers/handleAsyncActions ';

const initialState = {
  invoiceEmision: { data: null, status: 'idle', error: null, pending:false },
  invoiceApiFibre: { data: null, status: 'idle', error: null, pending:false },
  dolarPrice: 1
  // Agrega más estados iniciales según sea necesario
};

const multipleSlice = createSlice({
  name: 'multiple',
  initialState,
  reducers: {
    updateDolarPrice(state, action) {
      state.dolarPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
   handleAsyncActions(builder, Emision, 'invoiceEmision');
   handleAsyncActions(builder, getInvoiceFibre, 'invoiceApiFibre');
    // Aplica handleAsyncActions para cada acción asíncrona adicional
  },
});

export const { updateDolarPrice } = multipleSlice.actions;
export default multipleSlice.reducer;
//export default multipleSlice.actions;
