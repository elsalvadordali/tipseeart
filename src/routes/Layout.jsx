import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) return <Navigate to='/auth/profile' />
  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </>
  );
};

export default Layout;
