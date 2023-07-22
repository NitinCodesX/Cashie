import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const idx=state.data.findIndex((et)=>et.item._id===action.payload._id)
      if(idx<0)
       state.data.push({ item: action.payload, qty: 1 });
    },
    increaseQty: (state, action) => {
      // console.log("Haaaaaaaaaaaaaaa", state.data[0])
      const idx = state.data.findIndex((et) => et.item._id === action.payload);
      state.data[idx].qty++;
    },
    decreaseQty: (state, action) => {
      const idx = state.data.findIndex((et) => et.item._id === action.payload);
      state.data[idx].qty--;

      if (state.data[idx].qty === 0)
        state.data = state.data.filter((et) => et.item._id !== action.payload);
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((et) => et.item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
