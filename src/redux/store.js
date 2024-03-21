import { authSlice } from "./features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/productSlice";
import { uiSlice } from "./features/uiSlice";
import {customerSlice} from "./features/customerSlice";
import {invoiceSlice} from "./features/invoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    invoice : invoiceSlice.reducer,
    ui: uiSlice.reducer,
    customer: customerSlice.reducer,
  },

  //* borra el error de serializacion
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
