import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ItemList from "../components/ItemList";
// import AddToCartPage from "../pages/AddToCart";
import { CartProvider} from "../action/CartContext";

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);

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
    <CartProvider>
      <div>
        <div style={{ display: "block", gap: "10px" }}>
          <Row gutter={[16, 16]}>
            {itemsData.map((item) => (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <ItemList item={item} />
              </Col>
            ))}
          </Row>
        </div>

      </div>
    </CartProvider>
  );
};

export default HomePage;
