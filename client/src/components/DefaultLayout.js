import React from "react";
import "../Styles/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";

import {
  HomeOutlined,
  PaperClipOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty } from "../redux/slices/cartSlice"; // Import the addToCart action
import { Button } from "antd";
import { markLoggedIn } from "../redux/slices/authSlice";

const DefaultLayout = () => {
  const navigate = useNavigate();

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

  const handleShowCart = (item) => {
    dispatch(increaseQty(item)); // Dispatch the addToCart action with the selected item
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
            <Button
              onClick={async () => {
                await dispatch(markLoggedIn(false));
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </li>
          <li className="addToCart">
            <ShoppingCartOutlined />
            <Link to="/ShowCart">Show Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DefaultLayout;
