import authReducer, {
  login,
  logout,
  toggleMenu,
  updateData,
} from "./authSlice";
import loadingReducer, { start, end } from "./loadingSlice";
import editorReducer, { open, close } from "./editorSlice";
import postReducer, {
  add,
  setSlug,
  replaceAllPosts,
  addPostsById,
} from "./postSlice";

export {
  authReducer,
  loadingReducer,
  login,
  logout,
  toggleMenu,
  updateData,
  start,
  end,
  postReducer,
  add,
  editorReducer,
  setSlug,
  replaceAllPosts,
  addPostsById,
};
