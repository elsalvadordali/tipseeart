import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateProfile, { loader as createProfileLoader } from './routes/CreateProfile'
import Error from './routes/Error'
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Artist, {loader as artistLoader } from "./routes/Artist";
import Profile, { loader as profileLoader } from "./routes/Profile";
import SignUp from "./routes/SignUp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/create-profile", element: <CreateProfile />, loader: createProfileLoader },
        { path: "/profile", element: <Profile />, loader: profileLoader },
        { path: "/:id", element: <Artist />, loader: artistLoader },

      ],
    },
  ]

  // createRoutesFromElements(
  //     <Route element={<Layout />}>
  //       <Route path="/" element={<Home />} errorElement={<Error />} />
  //       <Route path="/login" element={<Login />} errorElement={<Error />} />
  //       <Route path="/signup" element={<SignUp />} errorElement={<Error />} />
  //       <Route
  //         path={"/create-profile"}
  //         element={<CreateProfile />}
  //         errorElement={<Error />}
  //       />
  //       <Route
  //         path={"/Profile"}
  //         element={<Profile />}
  //         loader={() => profileLoader}
  //         errorElement={<Error />}
  //       />
  //       <Route path={"*"} element={<NotFound />} />
  //     </Route>
  // )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
