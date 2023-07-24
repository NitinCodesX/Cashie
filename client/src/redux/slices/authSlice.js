import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    markLoggedIn: (state, action) => {
      // for logout
      if (!action.payload) {
        localStorage.removeItem("auth");
      }

      state.loggedIn = action.payload;
    },
  },
});

export const { markLoggedIn } = authSlice.actions;

export default authSlice.reducer;
