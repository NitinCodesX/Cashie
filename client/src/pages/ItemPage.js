import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";


// const CartItem = ({ item }) => {
//   const { dispatch } = useCart();

//   const cartItemStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//   };

//   const handleRemoveFromCart = () => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: item });
//   };


const ItemPage = () => {

 
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/items/get-item"
        );
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);
  
  return (


  //   <div style={cartItemStyle}>
  //   <div>
  //     <img
  //       src={item.image}
  //       alt={item.name}
  //       style={{ height: "50px", width: "50px", marginRight: "10px" }}
  //     />
  //     <span>
  //       {item.name} - {item.price} USD
  //     </span>
  //   </div>
  //   <div>
  //     <Button onClick={handleRemoveFromCart}>-</Button>
  //     <span style={{ margin: "0 5px" }}>
  //       {item.quantity}
  //     </span>
  //     <Button onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}>
  //       +
  //     </Button>
  //   </div>
  // </div>
    
    
    
    <div>
      <h1>ItemPage</h1>
    </div>
  );
};

export default ItemPage;
