import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import Items from "./pages/Items";
import DefaultLayout from "./components/DefaultLayout";
import ShowCartPage from "./pages/ShowCart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Items";
import { markLoggedIn } from "./redux/slices/authSlice";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth");
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loggedIn && token) {
      dispatch(markLoggedIn(true));
    }
  }, [loggedIn, dispatch, token]);

  return (
    <div style={{ display: "flex" }}>
      <Router>
        <DefaultLayout />
        <div style={{ marginLeft: "220px" }}>
          <Routes>
            {loggedIn ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/items" element={<Items />} />
                <Route path="/ShowCart" element={<ShowCartPage />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </>
            ) : (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
