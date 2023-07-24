import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux"; // Import the useSelector hooks
import "../Styles/ShowCart.css";

import { Row, Col, Button, Modal, Form, Input, Select, message } from "antd";
import CartItem from "../components/CartItem";
import { Footer } from "antd/es/layout/layout";

const ShowCartPage = () => { 
  const [billPopup, setBillPopup]=useState(false);
  const { data, totalPrice} = useSelector((state) => state.cart); // Access cart items from the Redux store

  const handleSubmit=(value)=>{
    console.log(localStorage.getItem("auth"))
    const newObject={
      ...value,totalPrice
    }
    console.log(newObject)
  }

  return (
    <div className="itemWrapper">
      <h1>Cart Items</h1>
      {data.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {data.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
      )} 
      <div className="totalPrice">
        <p>Total Price:</p>
        <p>$ {totalPrice}</p>
      </div>
      <Button onClick={()=>setBillPopup(true)} className="invoice">
         Create Invoice
      </Button>
      <Modal title="Create Invoice" visible={billPopup} onCancel={()=>setBillPopup(false)} footer={false}>
      <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerContact" label="Contact Number">
            <Input />
          </Form.Item>
          <Form.Item
            name="paymentMode"
            label="Payment Method"
            rules={[{ required: true, message: "Please select the mode of payment" }]}
          >
            <Select name="category">
              <Select.Option value="cash">cash</Select.Option>
              <Select.Option value="card">card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h2>
              Total: <b>$ {totalPrice}</b>
            </h2>
          </div>
          <div className="d-flex justifu-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowCartPage;
