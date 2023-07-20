import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage.js";
import DefaultLayout from "./components/DefaultLayout";
import AddToCartPage from "./pages/AddToCart";
function App() {
  return (
    <Provider store={store}>
      <div style={{ display: "flex"}}>
        <Router>
          <DefaultLayout />
          <div style={{marginLeft:"220px"}}>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/items" element={<ItemPage />} />
              <Route path="/addToCart" element={<AddToCartPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
