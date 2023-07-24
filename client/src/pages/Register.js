import React from "react";
import "../index.css";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Button } from "antd/es/radio";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    console.log("hiiiii")
    try {
      await axios.post("http://localhost:8080/api/users/register", value);
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
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
