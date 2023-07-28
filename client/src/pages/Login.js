import React, { useEffect } from "react";
import "../index.css";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { markLoggedIn } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        value
      );
      dispatch(markLoggedIn(true));
      message.success("login successful");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      message.error("Incorrect Credentials");
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
