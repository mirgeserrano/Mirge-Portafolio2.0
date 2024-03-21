import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    addProduct: (state, action) => {
      //actualizo el arreglo de tareas
      return [...state, action.payload];
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
    resetProduct: (state) => {
      state.items = null;
    },
  },
});

export const {
  addProduct,
  deleteProdut,
  editProduct,
  setProducts,
  setSearchResults,
  resetProduct,
} = productSlice.actions;
export default productSlice.reducer;
