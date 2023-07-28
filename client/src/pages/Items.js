import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Input, Select, message } from "antd";
import "../Styles/Items.css";
import ItemList from "../components/ItemList";

const backgroundColor = "#F8F1F9";

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
    {
      name: "french",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrpFdlzpsAApcIKhEpKIiBqNeiJvgWydnYg&usqp=CAU",
    },
    {
      name: "burger",
      imageURL:
        "https://img.freepik.com/free-photo/double-hamburger-isolated-white-background-fresh-burger-fast-food-with-beef-cream-cheese_90220-1192.jpg?w=2000",
    },
    {
      name: "pizza",
      imageURL:
        "https://imgmedia.lbb.in/media/2020/11/5fa17943d511fc4b649fcfc2_1604417859096.jpg",
    },
  ];

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/items/get-item`
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
        `${process.env.REACT_APP_API_URL}/api/items/add-item`,
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
        marginTop: "20px",
        width: "86vw",
        background: backgroundColor,
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
        <h1
          style={{
            fontSize: "45px",
          }}
        >
          ITEM LIST
        </h1>
        <Button
          className="button"
          style={{
            height: "50px",
            width: "100px",
            fontSize: "20px",
            borderRadius: "20px",
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
        <div className="categories">
          {categories.map((category) => (
            <div
              className="category"
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img
                className="imageCat"
                src={category.imageURL}
                alt={category.name}
                height="60"
                width="80"
              ></img>
            </div>
          ))}
        </div>
        <Row gutter={[16, 16]} className="item">
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
              <Select.Option value="french">French</Select.Option>
              <Select.Option value="pizza">Pizza</Select.Option>
              <Select.Option value="burger">Burger</Select.Option>
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
