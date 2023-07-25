import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  totalPrice:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const idx=state.data.findIndex((et)=>et.item._id===action.payload._id)
      if(idx<0){
       state.data.push({ item: action.payload, qty: 1 });
       state.totalPrice+=action.payload.price;
      }
    },
    increaseQty: (state, action) => {
      const idx = state.data.findIndex((et) => et.item._id === action.payload);
      state.data[idx].qty++;
      state.totalPrice+=state.data[idx].item.price
    },
    decreaseQty: (state, action) => {
      const idx = state.data.findIndex((et) => et.item._id === action.payload);
      state.data[idx].qty--;
      state.totalPrice-=state.data[idx].item.price
      if (state.data[idx].qty === 0)
        state.data = state.data.filter((et) => et.item._id !== action.payload);
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((et) => et.item._id !== action.payload);
    },
    emptyCart: (state) => {
      state.data = [];
      state.totalPrice=0;
    },

  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, emptyCart} =
  cartSlice.actions;
export default cartSlice.reducer;
