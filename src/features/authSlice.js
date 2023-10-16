import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  menuOpen: false,
  loginPopup: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.menuOpen = false;
      state.loginPopup = false;
    },
    toggleMenu: (state, action) => {
      state.menuOpen = action.payload;
    },
    updateData: (state, action) => {
      state.userData = action.payload;
    },
    showLoginPopup: (state, action) => {
      state.loginPopup = action.payload;
    },
  },
});

export const { login, logout, toggleMenu, updateData, showLoginPopup } =
  authSlice.actions;
export default authSlice.reducer;
