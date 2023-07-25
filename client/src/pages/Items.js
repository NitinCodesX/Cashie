import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Input, Select, message } from "antd";
import "../Styles/Items.css";
import ItemList from "../components/ItemList";

const backgroundColor = "#d4bd7d";

const HomePage = () => {
  const [form] = Form.useForm();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSFB6kKowRKO2M7WbFoeTHVTVdTgLLwu5bA&usqp=CAU",
    },
    {
      name: "noodles",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyG4IjPqAHJfu8ZPrVdXKRsan9f9SEjqxZ_Q&usqp=CAU",
    },
    {
      name: "rice",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0HehLCQnqdRL7zvEwmJapS5Vr6OifYVFN1A&usqp=CAU",
    },
  ];
  // const [editItem,setEditItem]=useState(null)

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/items/get-item"
      );
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
      form.resetFields();
      getAllItems();
    } catch (error) {
      message.error("Something went wrong");

      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "80px",
        border: "2px solid black",
        width: "86vw",
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
        <Button className="button" onClick={() => setPopupModal(true)}>
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
        <div className="categories">
          {categories.map((category) => (
            <div
              className="category"
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img
                src={category.imageURL}
                alt={category.name}
                height="60"
                width="80"
              ></img>
            </div>
          ))}
        </div>
        <Row gutter={[16, 16]} className="item">
          {console.log(selectedCategory)}
          {itemsData
            .filter((i) => i.category === selectedCategory)
            .map((item) => (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <ItemList key={item.id} item={item} getAllItems={getAllItems} />
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
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
  );
};

export default HomePage;
