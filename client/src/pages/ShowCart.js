import React from "react";
import { useSelector } from "react-redux"; // Import the useSelector hooks
import "../Styles/ShowCart.css";

import CartItem from "../components/CartItem";

const ShowCartPage = () => {
  const { data } = useSelector((state) => state.cart); // Access cart items from the Redux store

  return (
    <div className="itemWrapper">
      <h1>Cart Items</h1>
      {data.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {data.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCartPage;
