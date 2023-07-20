import React from "react";
import "../Styles/DefaultLayout.css";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  PaperClipOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions"; // Import the addToCart action

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const itemButton = {
    margin: 10,
    marginLeft: 60,
    marginTop: 10,
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch the addToCart action with the selected item
  };

  return (
    <div className="App">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className={`logo ${isSidebarOpen ? "open" : ""}`}>CASHIE</div>
       
        <ul>
          <li>
            <HomeOutlined />
            <Link to="/home">Home</Link>
          </li>
          <li>
            <PaperClipOutlined />
            <Link to="/bills">Bills</Link>
          </li>
          <li>
            <UnorderedListOutlined />
            <Link to="/items">Items</Link>
          </li>
          <li>
            <UserOutlined />
            <Link to="/customers">Customers</Link>
          </li>
          <li className="logout">
            <LogoutOutlined />
            <Link to="/logout">Logout</Link>
          </li>
          <li className="addToCart">
            <ShoppingCartOutlined />
            <Link to="/AddToCart">Add To Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DefaultLayout;
