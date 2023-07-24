import React from "react";
import "../index.css";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Button } from "antd/es/radio";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate=useNavigate()
  const handleSubmit = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        value
      );
      console.log(res);
      message.success("login successful");
      navigate('/')
    } catch (error) {
      message.error("Something went wrong");

      console.log(error);
    }
  };

  return (
    <div>
      <div className="outRegister">
        <div className="register">
          <h1> POS App</h1>
          <h3>Login Page</h3>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div>
              <p>
                Not a user
                <Link to="/register"> Register here !</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
