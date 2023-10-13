import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  About,
  Collections,
  Contact,
  Dashboard,
  EditPost,
  Home,
  IndividualPost,
  Login,
  Overview,
  Posts,
  Signup,
  WritePost,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:authorId/:postSlug/edit" element={<EditPost />} />
      <Route path="/:authorId/:postSlug" element={<IndividualPost />} />
      <Route path="/:authorId" element={<Dashboard />}>
        <Route path="/:authorId" element={<Overview />} />
        <Route path="/:authorId/posts" element={<Posts />} />
        <Route path="/:authorId/collections" element={<Collections />} />
      </Route>
      {/* todo : make better */}
      {/* <Route path="/post" element={<IndividualPost />} /> */}
      <Route path="/write-post" element={<WritePost />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
