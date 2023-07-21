import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";

const ItemList = ({ item }) => {
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

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const dispatch = useDispatch();

  const handleShowCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div style={card}>
      <img style={imgStyle} src={item.image} alt={item.name} />
      <h2 style={{ textAlign: "center", margin: "5px" }}>{item.name}</h2>
      <div style={buttonStyle}>
        <Button onClick={handleShowCart}>Add to cart</Button>
        <Button>Edit</Button>

        <Button>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ItemList;
