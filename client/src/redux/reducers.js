// reducers.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let index = state.cartItems.findIndex((item) => item._id === payload._id);

  switch (type) {
    case ADD_TO_CART:
      if (index >= 0) {
        // If item already exists in the cart, increase the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // If item does not exist in the cart, add it with quantity = 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      if (index >= 0) {
        // If item exists in the cart, decrease the quantity
        const updatedCartItems = state.cartItems.map((item) =>
          item._id === payload._id ? { ...item, quantity: item.quantity - 1 } : item
        );

        // Remove the item from the cart if quantity becomes 0
        return {
          ...state,
          cartItems: updatedCartItems.filter((item) => item.quantity > 0),
        };
      }
      return state;
    default:
      return state;
  }
};

export default cartReducer;
