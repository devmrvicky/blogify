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
  CategoriesLists,
  Collections,
  Contact,
  Dashboard,
  EditPost,
  EmailPasswordSetting,
  Home,
  IndividualPost,
  Login,
  Me,
  NameSetting,
  Notification,
  Overview,
  PersonalSettings,
  Posts,
  Preferences,
  Profile,
  RedirectionPage,
  SettingLists,
  Signup,
  WritePost,
} from "./pages";
import CategoryPosts from "./components/CategoryPosts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/:" element={<Me />}/> */}
      <Route path="/me" element={<Me />}>
        <Route path="/me" element={<Profile />} />
        <Route path="/me/preferences" element={<Preferences />}>
          <Route
            path="/me/preferences/category"
            element={<CategoriesLists />}
          />
        </Route>
        <Route path="/me/personal-settings" element={<PersonalSettings />}>
          <Route
            path="/me/personal-settings/profile"
            element={<NameSetting />}
          />
          <Route
            path="/me/personal-settings/email-password"
            element={<EmailPasswordSetting />}
          />
        </Route>
      </Route>
      <Route path="/:authorId/notification" element={<Notification />} />
      <Route path="/:authorId/:postSlug/edit" element={<EditPost />} />
      <Route path="/:authorId/:postSlug" element={<IndividualPost />} />
      <Route path="/:authorId" element={<RedirectionPage />}>
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
