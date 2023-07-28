import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "../Styles/Customers.css";

const CustomerPage = () => {
  const [billsData, setBillsData] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/bills/get-bills`
      );
      setBillsData(data);
      console.log(billsData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <div className="custom-table">
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Number</th>
          </tr>
        </thead>
        <tbody>
          {billsData?.map((item) => (
            <tr>
              <td>{item.customerName}</td>
              <td>{item.customerNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPage;
