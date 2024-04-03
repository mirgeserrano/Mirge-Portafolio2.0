import { authSlice } from "./features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { customerSlice } from "./features/customerSlice";
import { invoiceSlice } from "./features/invoiceSlice";
import { productSlice } from "./features/productSlice";
import { uiSlice } from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    invoice : invoiceSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
  },

  //* borra el error de serializacion
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
