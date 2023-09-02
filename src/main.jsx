import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Protected from "./routes/Protected";
import CreateProfile, {
  loader as createProfileLoader,
} from "./routes/CreateProfile";
import Error from "./routes/Error";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import About from "./routes/About";
import Login from "./routes/Login";
import Artist, { loader as artistLoader } from "./routes/Artist";
import Profile, { loader as profileLoader } from "./routes/Profile";
import SignUp from "./routes/SignUp";
import Contact from "./routes/Contact";


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Protected />,
    errorElement: <Error />,
    children: [
      {
        path: "create-profile",
        element: <CreateProfile />,
        loader: createProfileLoader,
      },
      {
        path: "edit-profile",
        element: <CreateProfile />,
        loader: createProfileLoader,
      },
      { path: "profile", element: <Profile />, loader: profileLoader },
    ],
  }, {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/contact", element: <Contact />},
      { path: "/:id", element: <Artist />, loader: artistLoader },

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
