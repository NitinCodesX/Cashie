import React from "react";
import { Button } from "antd";
import { useCart } from "../action/CartContext";

const AddToCartPage = () => {
  const { cartItems, dispatch } = useCart();

  const cartItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  const handleRemoveFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={cartItemStyle}>
              <span>
                {item.name} - {item.price} USD
              </span>
              <div>
                <Button onClick={() => handleRemoveFromCart(item)}>-</Button>
                <span style={{ margin: "0 5px" }}>
                  {cartItems.filter((i) => i.id === item.id).length}
                </span>
                <Button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: item })
                  }
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
