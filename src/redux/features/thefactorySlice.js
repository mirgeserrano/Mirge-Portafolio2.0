import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

export const thefactorySlice = createSlice({
  name: "theFactory",
  initialState,

  reducers: {
    Emision: (state, action) => {     
       state.data = {};
    },
    // Loading:(state, action)=>{
    //   state.data = ;
    // }
  },
});

export const { Emision } = thefactorySlice.actions;
export default thefactorySlice.reducer;
