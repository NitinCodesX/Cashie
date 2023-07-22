import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Items from "./pages/Items"
import DefaultLayout from "./components/DefaultLayout";
import ShowCartPage from "./pages/ShowCart";
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
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
