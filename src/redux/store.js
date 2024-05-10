import { authSlice } from "./features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { customerSlice } from "./features/customerSlice";
import { invoiceSlice } from "./features/invoiceSlice";
import { productSlice } from "./features/productSlice";
import { uiSlice } from "./features/uiSlice";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Función para guardar el estado en el almacenamiento local
const saveState = (state) => {
  try {
    const { auth } = state;
    const stateToSave = { auth };

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("state", serializedState);
  } catch {
   console.log(error);
  }
};

// Cargar el estado inicial desde el almacenamiento local
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    invoice: invoiceSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
  },
  //thunk,
  //* borra el error de serializacion
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

