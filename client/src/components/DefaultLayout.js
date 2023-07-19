import React, { useState } from "react";
import "../Styles/DefaultLayout.css";

import { Link } from "react-router-dom";
import {
  HomeOutlined,
  PaperClipOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className={`logo ${isSidebarOpen ? "open" : ""}`}>CASHIE</div>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <span class="open">{isSidebarOpen ? "<" : ">"}</span>
        </div>
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
        </ul>
      </div>
    </div>
  );
};

export default DefaultLayout;
