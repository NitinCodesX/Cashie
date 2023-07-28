import React, { useEffect } from "react";
import "../index.css";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        value
      );
      message.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <div className="outRegister">
        <div className="register">
          <h1> POS App</h1>
          <h3>Register Page</h3>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div>
              <p>
                Already Registered?
                <Link to="/Login"> Login Here!</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
