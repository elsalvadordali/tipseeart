import { useState } from "react";
import { Navigate } from "react-router-dom";

const LogoutComponent = ({setState}) => {
  const [isAuthenticated, setAuth] = useState(true)
  function signOut() {
    sessionStorage.clear();
    localStorage.clear();
    setAuth(false)
  }

  if (!setAuth) <Navigate to="/" />
  return (
    <button
      className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black md:text-white"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default LogoutComponent;
