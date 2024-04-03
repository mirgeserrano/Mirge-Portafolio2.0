import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    user: {},
    errorMessage: undefined,
    customer: {
      codclie: "",
      descrip: "",
      direc1: "",
      telef: "",
      email: "",
      tipocli: "",
    },
    product: null,
    invoice: {},
  },
  reducers: {
    onCheckig: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onlogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    ClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
export const { onCheckig, onlogin, onLogout, ClearErrorMessage } =
  authSlice.actions;
