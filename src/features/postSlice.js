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
  collectedPosts: [],
  allLabels: [
    "Engineer",
    "Developer",
    "Designer",
    "Architect",
    "Manager",
    "Analyst",
    "DevOps",
    "QA",
    "Coder",
    "Programmer",
    "Tech Lead",
    "Consultant",
    "Writer",
    "Hacker",
    "Guru",
    "Admin",
    "SRE",
    "Agile",
    "Tester",
    "Support",
    "DBA",
    "Ops",
    "Scrum",
    "Lead",
    "Writer",
    "Consultant",
    "Coder",
    "Analyst",
    "Manager",
    "Architect",
    "Designer",
    "Hacker",
    "Guru",
    "Support",
    "Ops",
    "Tester",
    "Admin",
    "DBA",
    "SRE",
    "Ops",
    "Agile",
    "Tester",
    "Lead",
    "Writer",
    "Consultant",
  ],
  selectedLabels: [],
  categories: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    add: (state, action) => {
      state.allPosts.push(action.payload);
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
        categoryPopup = false,
        mainProfilePage = false,
        profileEditPage = false,
        setUserNameUrlPage = false,
      }) => {
        return {
          payload: {
            clapsPage,
            respondPage,
            responding,
            dashboardSidebar,
            categoryPopup,
            mainProfilePage,
            profileEditPage,
            setUserNameUrlPage,
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
    collectPost: (state, action) => {
      state.collectedPosts.push(action.payload);
    },
    deleteCollectedPost: (state, action) => {
      state.collectedPosts = state.collectedPosts.filter(
        (postId) => postId !== action.payload
      );
    },
    addLabel: (state, action) => {
      state.selectedLabels.push(action.payload);
      state.allLabels = state.allLabels.filter(
        (label) => label !== action.payload
      );
    },
    removeLabel: (state, action) => {
      state.allLabels.push(action.payload);
      state.selectedLabels = state.selectedLabels.filter(
        (label) => label !== action.payload
      );
    },
    addCategories: (state, action) => {
      if (state.categories.includes(action.payload)) return;
      state.categories.push(action.payload);
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
  collectPost,
  deleteCollectedPost,
  addLabel,
  removeLabel,
  addCategories,
} = postSlice.actions;
export default postSlice.reducer;
