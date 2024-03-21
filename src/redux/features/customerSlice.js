import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {},
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fetchCustomerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerSuccess: (state, { payload }) => {
      state.loading = true;
      state.customer = payload;
    },
    fetchCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetCustomerFailure: (state) => {
      state.loading = null;
      state.customer = false
      state.error = null;
    },
  },
});

export const {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailure,
  resetCustomerFailure,
} = customerSlice.actions;
 export const selectCustomer =(state) =>state.customer.customer;
export default customerSlice.reducer;
