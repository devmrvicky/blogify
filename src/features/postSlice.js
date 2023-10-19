import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  slug: "",
  postsById: [],
  currentPost: {},
  isPageOpen: {
    clapsPage: false,
    respondPage: false,
  },
  currentResponds: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    add: {
      reducer: (state, action) => {
        state.allPosts.push(action.payload);
      },
      prepare: ({
        title,
        article,
        authorName,
        authorId,
        readTime,
        $id,
        $createdAt,
        postSlug,
      }) => {
        return {
          payload: {
            title,
            article,
            authorId,
            authorName,
            readTime,
            $id,
            $createdAt,
            postSlug,
          },
        };
      },
    },
    replaceAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    addPostsById: (state, action) => {
      state.postsById = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    addClaps: (state, action) => {
      // console.log(action.payload);
      state.currentPost = {
        ...state.currentPost,
        claps: state.currentPost.claps + action.payload.claps,
        whoClaps: Array.from(
          new Set([...state.currentPost.whoClaps, action.payload.whoClap])
        ),
      };
    },
    toggleActionPage: {
      reducer: (state, action) => {
        state.isPageOpen = action.payload;
      },
      prepare: ({
        clapsPage = false,
        respondPage = false,
        responding = false,
        dashboardSidebar = false,
      }) => {
        return {
          payload: {
            clapsPage,
            respondPage,
            responding,
            dashboardSidebar,
          },
        };
      },
    },
    addAllResponds: (state, action) => {
      state.currentResponds = action.payload;
    },
    addRespond: (state, action) => {
      state.currentResponds.push(action.payload);
    },
  },
});

export const {
  add,
  setSlug,
  replaceAllPosts,
  addPostsById,
  setCurrentPost,
  addClaps,
  toggleActionPage,
  addAllResponds,
  addRespond,
} = postSlice.actions;
export default postSlice.reducer;
