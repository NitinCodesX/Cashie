import { Button, Modal} from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import "../Styles/BillsPage.css";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
const BillsPage = () => {
  const [billsData, setBillsData] = useState(null);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const componentRef = useRef();
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Number</th>
            <th>Total Bill</th>
            <th>Payment Mode</th>
            <th>Items Bought</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billsData?.map((item) => (
            <tr>
              <td>{item.customerName}</td>
              <td>{item.customerNumber}</td>
              <td>$ {item.totalPrice}</td>
              <td>{item.paymentMode}</td>
              <td>{item.ItemsInCart.map((i) => i.name).toString()}</td>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>
                <EyeOutlined
                  className="actionEye"
                  onClick={() => {
                    setSelectedBill(item);
                    setPopupModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        className="modal"
        title="Invoice Details"
        visible={popupModal}
        onCancel={() => setPopupModal(false)}
        footer={false}
      >
      <div className="print" ref={componentRef}>
        <img
          src="https://www.pngitem.com/pimgs/m/178-1783030_online-shopping-logo-png-transparent-png.png"
          alt="error"
          height="100px"
        />
        <h1 style={{ marginTop: "0px" }}>CASHIE</h1>
        <p>Contact: 123456 | Gandhinagar Gujurat</p>
        <div>Customer Name: {selectedBill?.customerName}</div>
        <div>Phone No.: {selectedBill?.customerNumber}</div>
        <table>
          <thead>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedBill?.ItemsInCart?.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${item.price}</td>
                  <td>{`$${item.qty * item.price}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="totalPrice">
          Total Price: ${selectedBill?.totalPrice}
        </div>
        <div>
          <strong>Thank you for shopping with us! </strong>
          Please note this is non refundable amount.
          <strong> Have a nice day!</strong>
        </div>
        </div>
        <div>
        <Button className="printButton" type="primary" onClick={handlePrint}>Print</Button>
        </div>
      </Modal>
    </div>
  );
};
export default BillsPage;