import React from "react";
import { useSelector } from "react-redux"; // Import the useSelector hooks
import "../Styles/ShowCart.css";

import CartItem from "../components/CartItem";

const ShowCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from the Redux store

  return (
    <div className="itemWrapper">
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCartPage;
