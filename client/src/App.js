// npm i react-router-dom axios redux react-redux redux-thunk antd
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage.js";
import DefaultLayout from "./components/DefaultLayout";
import AddToCartPage from "./pages/AddToCart";
function App() {
  return (
    <div style={{ display: "flex" }}>
      <BrowserRouter>
        <DefaultLayout />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/addToCart" element={<AddToCartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
