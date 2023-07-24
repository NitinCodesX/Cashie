import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Items from "./pages/Items"
import DefaultLayout from "./components/DefaultLayout";
import ShowCartPage from "./pages/ShowCart";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <Provider store={store}>
      <div style={{ display: "flex" }}>
        <Router>
          <DefaultLayout />
          <div style={{ marginLeft: "220px" }}>
            <Routes>
              <Route path="/items" element={<Items/>} />
              <Route path="/ShowCart" element={<ShowCartPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
