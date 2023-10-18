import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allPosts: [
  //   {
  //     authorId: "author1",
  //     postId: "1",
  //     title: "A Jew, A Muslim, and Israel: Cracks in the Wall",
  //     article:
  //       "In light of the conflict in Israel, I’m sharing my essay on visiting Israel during the Gaza Crisis in 2009 and the revelation I had",
  //     createdAt: "Oct 10",
  //     readTime: "5 min read",
  //     categories: ["Culture"],
  //     FeaturedImg: "imgId",
  //   },
  //   {
  //     authorId: "author1",
  //     postId: "2",
  //     title: "A Jew, A Muslim, and Israel: Cracks in the Wall",
  //     article:
  //       "In light of the conflict in Israel, I’m sharing my essay on visiting Israel during the Gaza Crisis in 2009 and the revelation I had",
  //     createdAt: "Oct 10",
  //     readTime: "5 min read",
  //     categories: ["Culture"],
  //     FeaturedImg: "imgId",
  //   },
  //   {
  //     authorId: "author1",
  //     postId: "3",
  //     title: "A Jew, A Muslim, and Israel: Cracks in the Wall",
  //     article:
  //       "In light of the conflict in Israel, I’m sharing my essay on visiting Israel during the Gaza Crisis in 2009 and the revelation I had",
  //     createdAt: "Oct 10",
  //     readTime: "5 min read",
  //     categories: ["Culture"],
  //     FeaturedImg: "imgId",
  //   },
  //   {
  //     authorId: "author1",
  //     postId: "4",
  //     title: "A Jew, A Muslim, and Israel: Cracks in the Wall",
  //     article:
  //       "In light of the conflict in Israel, I’m sharing my essay on visiting Israel during the Gaza Crisis in 2009 and the revelation I had",
  //     createdAt: "Oct 10",
  //     readTime: "5 min read",
  //     categories: ["Culture"],
  //     FeaturedImg: "imgId",
  //   },
  //   {
  //     authorId: "author1",
  //     postId: "5",
  //     title: "A Jew, A Muslim, and Israel: Cracks in the Wall",
  //     article:
  //       "In light of the conflict in Israel, I’m sharing my essay on visiting Israel during the Gaza Crisis in 2009 and the revelation I had",
  //     createdAt: "Oct 10",
  //     readTime: "5 min read",
  //     categories: ["Culture"],
  //     FeaturedImg: "imgId",
  //   },
  // ],
  allPosts: [],
  slug: "",
  postsById: [],
  currentPost: {},
  isPageOpen: {
    clapsPage: false,
    respondPage: false,
  },
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
      prepare: ({ clapsPage = false, respondPage = false }) => {
        return {
          payload: {
            clapsPage,
            respondPage,
          },
        };
      },
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
} = postSlice.actions;
export default postSlice.reducer;
