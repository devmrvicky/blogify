import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  editorReducer,
  loadingReducer,
  postReducer,
} from "../features";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    posts: postReducer,
    editor: editorReducer,
  },
});

export default store;
