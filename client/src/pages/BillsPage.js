import { Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import "../Styles/BillsPage.css";
const BillsPage = () => {
  const navigate = useNavigate();
  // Define the columns for the table
  const [billsData, setBillsData] = useState([]);
  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/bills/get-bills"
      );
      setBillsData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);
  console.log(billsData);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Number</th>
            <th>Total Price</th>
            <th>Payment Mode</th>
            <th>Items Bought</th>
          </tr>
        </thead>
        <tbody>
          {billsData.map((item) => (
            <tr>
              <td>{item.customerName}</td>
              <td>{item.customerNumber}</td>
              <td>{item.totalPrice}</td>
              <td>{item.paymentMode}</td>
              <td>{item.cartItems.map((i) => i.name).toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsPage;
