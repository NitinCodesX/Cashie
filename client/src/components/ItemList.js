import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

const ItemList = ({ item, getAllItems }) => {
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const imgStyle = {
    height: "15rem",
    width: "15rem",
  };

  const card = {
    backgroundColor: "#f4f5d5",
    margin: "10px",
    width: "15rem",
    height: "21rem",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const dispatch = useDispatch();

  const handleShowCart = () => {
    dispatch(addToCart(item));
  };

  const handleEditSubmit = async (value) => {
    try {
      await axios.put("http://localhost:8080/api/items/edit-item", {
        ...value,
        itemId: editItem._id,
      });
      message.success("Item Updated successfully");
      getAllItems();
      setPopupModal(false);
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (id) => {
    try {
      await axios.delete("http://localhost:8080/api/items/delete-item", {
        data: { itemId: id },
      });
      message.success("Item Deleted Successfully");
      getAllItems();
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div style={card}>
      <img style={imgStyle} src={item.image} alt={item.name} />
      <h2 style={{ textAlign: "center", margin: "5px" }}>{item.name}</h2>
      <div style={buttonStyle}>
        <Button onClick={handleShowCart}>Add to cart</Button>
        <Button
          onClick={() => {
            setPopupModal(true);
            setEditItem(item);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDeleteSubmit(item._id);
          }}
        >
          <DeleteOutlined />
        </Button>

        <Modal
          title="Add new item"
          visible={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleEditSubmit}
          >
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
    </div>
  );
};

export default ItemList;
