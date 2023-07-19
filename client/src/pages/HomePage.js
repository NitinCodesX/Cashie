import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ItemList from "../components/ItemList";
const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/items/get-item"
        );
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);
  return (
    <div style={{ display: "block", gap: "10px" }}>
      <Row>
        {itemsData.map((item) => (
          <Col xs={24} lg={6} md={12} sm={6}>
            {/* props is used here*/}
            <ItemList item={item}></ItemList>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
