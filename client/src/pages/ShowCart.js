import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux"; // Import the useSelector hooks
import "../Styles/ShowCart.css";
import axios from "axios"
import { Button, Modal, Form, Input, Select, message } from "antd";
import CartItem from "../components/CartItem";
import {useNavigate} from "react-router-dom"
import { emptyCart } from "../redux/slices/cartSlice";
const ShowCartPage = () =>{ 
  const [billPopup, setBillPopup]=useState(false);
  const dispatch = useDispatch()
  const { data, totalPrice} = useSelector((state) => state.cart); // Access cart items from the Redux store
  const cartItems=data.map((single)=>{
    return {
      item:single.item,
      qty:single.qty
    }
  })
  const ItemsInCart=cartItems.map((cartItem)=>{
     return {
        "name":cartItem.item.name,
        "qty":cartItem.qty,
        "price":cartItem.item.price
     }
  })
  console.log(ItemsInCart);
  const navigate = useNavigate()
  const handleSubmit=async(value)=>{
    try {     
      const newObject={
        ...value,totalPrice,ItemsInCart
      }
      console.log(newObject)
      await axios.post('http://localhost:8080/api/bills/add-bills', newObject)

      message.success("Bill generate")
      dispatch(emptyCart())
      navigate('/bills')
    } catch (error) {
      console.log("Something went wrong")
    }
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
          <Form.Item name="customerNumber" label="Contact Number">
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
          <div className="d-flex justify-content-end">
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
