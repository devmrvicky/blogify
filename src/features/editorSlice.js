import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  articleData: {
    title: "",
    content: "",
  },
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
    getArticleData: (state, action) => {
      const data = {
        title: action.payload.title,
        content: action.payload.content,
      };
      state.articleData = data;
    },
    postArticle: (state, action) => {},
  },
});
export const { open, close } = editorSlice.actions;
export default editorSlice.reducer;
