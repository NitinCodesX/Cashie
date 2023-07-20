import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("add item => ", ...state);
      console.log([...state, action.payload]);
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      let index = state.findIndex((item) => item._id === action.payload._id);
      console.log("here", state);
      if (index >= 0) {
        state.splice(index, 1);
      }
      console.log("here again", state);
      return [...state];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
