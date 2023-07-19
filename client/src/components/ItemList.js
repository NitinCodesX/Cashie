import React from "react";

const ItemList = ({ item }) => {
  const imgStyle = {
    height: "15rem",
    width: "15rem",
  };

  const card = {
    backgroundColor: "#f4f5d5",
    margin: "10px",
    width: "15rem",
    height: "18rem",
  };

  return (
    <div style={card}>
      <img style={imgStyle} src={item.image} />
      <h2 style={{ textAlign: "center", margin: "5px" }}>{item.name}</h2>
    </div>
  );
};

export default ItemList;
