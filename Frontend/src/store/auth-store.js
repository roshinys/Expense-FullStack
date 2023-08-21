import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userId: localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isPremium: localStorage.getItem("isPrem")
    ? localStorage.getItem("isPrem")
    : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
    setPremium(state) {
      state.isPremium = true;
      localStorage.setItem("isPrem", true);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
