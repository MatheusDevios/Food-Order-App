import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expirationTime", action.payload.expirationTime);
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      state.token = null;
      state.isLoggedIn = false;
    },
    updateReduxState(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
