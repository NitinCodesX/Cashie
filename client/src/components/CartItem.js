import React from "react";
import { Button } from "antd";
// import { increaseQty } from "../redux/actions";
import { useDispatch } from "react-redux"; // Import the useSelector and useDispatch hooks
import { decreaseQty, increaseQty } from "../redux/slices/cartSlice";
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

  return (
    <div className="itemHolder" key={item.item._id} style={cartItemStyle}>
      <span>
        {item.item.name} - {item.item.price} USD
      </span>
      <div className="imagePlus">
        <div className="imgHolder">
          <img style={imageHolder} src={item.item.image} alt="item.name"></img>
        </div>
        <div>
          <Button onClick={() => dispatch(decreaseQty(item.item._id))}>
            -
          </Button>
          <span style={{ margin: "0 5px" }}>{item.qty}</span>
          <Button onClick={() => dispatch(increaseQty(item.item._id))}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
