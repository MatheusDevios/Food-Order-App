import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expirationTime", action.payload.expirationTime);
      localStorage.setItem("userId", action.payload.userId);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
    },
    updateReduxState(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
