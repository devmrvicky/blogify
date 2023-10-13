import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  menuOpen: false,
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
    },
    toggleMenu: (state, action) => {
      state.menuOpen = action.payload;
    },
    updateData: (status, action) => {
      status.userData = action.payload;
    },
  },
});

export const { login, logout, toggleMenu, updateData } = authSlice.actions;
export default authSlice.reducer;
