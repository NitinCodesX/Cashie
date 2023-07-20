import React from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector and useDispatch hooks
import "../Styles/AddToCart.css";
import { removeFromCart } from "../redux/actions"; // Import the removeFromCart action
import { addToCart } from "../redux/actions";

const AddToCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from the Redux store
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const cartItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  const imageHolder = {
    height: "10rem",
    width: "10rem",
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item)); // Dispatch the removeFromCart action with the selected item
  };

  return (
    <div className="itemWrapper">
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="itemHolder" key={item.id} style={cartItemStyle}>
              <span>
              {item.name} - {item.price} USD
              </span>
              <div className="imagePlus">
              <div className="imgHolder">
                <img style={imageHolder} src={item.image}></img>
              </div>
              <div ><Button onClick={() => handleRemoveFromCart(item)}>-</Button>
              <span style={{ margin: "0 5px" }}>{item.quantity}</span>
              <Button onClick={() => dispatch(addToCart(item))}>+</Button></div>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
