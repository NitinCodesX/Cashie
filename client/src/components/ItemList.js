import { Button } from "antd";
import React from "react";
import { useCart } from "../action/CartContext";

const ItemList = ({ item }) => {
  const { dispatch } = useCart();

  const imgStyle = {
    height: "15rem",
    width: "15rem",
  };

  const card = {
    backgroundColor: "#f4f5d5",
    margin: "10px",
    width: "15rem",
    height: "21rem",
  };

  const itemButton = {
    margin: 10,
    marginLeft: 60,
    marginTop: 10,
  };

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <div style={card}>
      <img style={imgStyle} src={item.image} alt={item.name} />
      <h2 style={{ textAlign: "center", margin: "5px" }}>{item.name}</h2>
      <Button style={itemButton} onClick={handleAddToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ItemList;
