import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const Protected = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('uid') ? true : false)

  const uid = localStorage.getItem("uid");
  const token = sessionStorage.getItem("token");
  if (!uid || !token) return <Navigate to='/' />
  if (!isLoggedIn) return <Navigate to='/' />
  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </>
  );
};

export default Protected;
