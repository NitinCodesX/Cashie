import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Input, Select, message } from "antd";
import ItemList from "../components/ItemList";
import { CartProvider } from "../action/CartContext";

const backgroundColor = "#d4bd7d";

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  // const [editItem,setEditItem]=useState(null)

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/items/get-item"
      );
      console.log(data);
      setItemsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  //handle form submit
  const handleSubmit = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/items/add-item",
        value
      );
      console.log(res);
      message.success("Item added successfully");
      getAllItems();
    } catch (error) {
      message.error("Something went wrong");

      console.log(error);
    }
  };

  return (
    <CartProvider>
      <div
        style={{
          marginTop: "80px",
          border: "2px solid black",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Item List</h1>
          <Button
            style={{
              background: "#dec47e",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => setPopupModal(true)}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            display: "block",
            gap: "10px",
            marginTop: "10px",
            backgroundColor: backgroundColor,
          }}
        >
          <Row gutter={[16, 16]}>
            {itemsData.map((item) => (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <ItemList item={item} getAllItems={getAllItems} />
              </Col>
            ))}
          </Row>
        </div>
        <Modal
          title="Add new item"
          visible={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category." }]}
            >
              <Select name="category">
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodels</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justifu-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </CartProvider>
  );
};

export default HomePage;
