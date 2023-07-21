import React from "react";
import { Button } from "antd";
import { addToCart } from "../redux/actions";
import { useDispatch } from "react-redux"; // Import the useSelector and useDispatch hooks
const CartItem = ({ item }) => {
  // const { dispatch } = useCart();
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

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  return (
    <div className="itemHolder" key={item.id} style={cartItemStyle}>
      <span>
        {item.name} - {item.price} USD
      </span>
      <div className="imagePlus">
        <div className="imgHolder">
          <img style={imageHolder} src={item.image} alt="item.name"></img>
        </div>
        <div>
          <Button onClick={() => handleRemoveFromCart(item)}>-</Button>
          <span style={{ margin: "0 5px" }}>{item.quantity}</span>
          <Button onClick={() => dispatch(addToCart(item))}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
