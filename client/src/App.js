// npm i react-router-dom axios redux react-redux redux-thunk antd
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage.js";
import DefaultLayout from "./components/DefaultLayout";
function App() {
  return (
    <div style={{ display: "flex" }}>
      <BrowserRouter>
        <DefaultLayout />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
