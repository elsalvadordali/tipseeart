import cn from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import { MenuToggle } from "./Icons";
import LogoutComponent from "./LogoutComponent";

const navLinks = [
  {
    page: "Home",
    path: "/",
  },
  {
    page: `About`,
    path: "/about",
  },
  {
    page: "Contact",
    path: "/contact",
  },
];

const Header = ({ setIsLoggedIn }) => {

  
  const [isAuthenticated, setAuth] = useState(
    sessionStorage.getItem("token") ? true : false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ↓ Auto Closes Menu when link/button is clicked within ↓ */
  function mobileMenuHandler() {
    setMobileMenuOpen((prev) => !prev);
  }

  function mobileMenuAutoClose() {
    setMobileMenuOpen((prev) => (prev === true ? false : false));
  }
  function signOut() {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <header className="bg-[#222222] p-12 flex justify-between items-center md:items-stretch relative">
      <Link to="/">
        <img src="/tipseeart.svg" className="w-36" alt="tip see art" />
      </Link>
      <nav className="hidden md:flex flex-col justify-between min-h-full max-w-lg w-full">
        <ul className="flex gap-5 justify-end items-center">
          {isAuthenticated && (
            <>
              <li>
                <button
                  className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black md:text-white"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
              <li>
                <Link
                  className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-white block"
                  to={"/auth/edit-profile"}
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-white block"
                  to={"/auth/profile"}
                >
                  See your Profile
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link
                  className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-white block"
                  to="/login"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-white block"
                  to="/signup"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="flex gap-3 justify-end">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavItem path={link.path}>{link.page}</NavItem>
            </li>
          ))}
        </ul>
      </nav>

      {/* ↓ Mobile Navbar and toggle button ↓ */}

      <button
        className="md:hidden relative z-20 w-14 h-14 bg-black text-white flex justify-center items-center"
        onClick={mobileMenuHandler}
      >
        <MenuToggle />
      </button>
      <div
        className={cn(
          "w-full absolute left-0 top-60 z-10 md:hidden h-screen",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="h-1/2 bg-white space-y-10">
          <ul className="flex flex-col gap-10 justify-center items-center pt-20">
            {navLinks.map((link, index) => (
              <li key={index} onClick={mobileMenuAutoClose}>
                <NavItem path={link.path} styles="text-black">
                  {link.page}
                </NavItem>
              </li>
            ))}
          </ul>
          <ul className="flex justify-center gap-3">
            {isAuthenticated && (
              <>
                <li onClick={mobileMenuAutoClose}>
                  <button
                    className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black md:text-white"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </li>
                <li onClick={mobileMenuAutoClose}>
                  <Link
                    className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black block"
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li onClick={mobileMenuAutoClose}>
                  <Link
                    className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black block"
                    to="/login"
                  >
                    Log in
                  </Link>
                </li>
                <li onClick={mobileMenuAutoClose}>
                  <Link
                    className="border-2 border-gray-200 py-1 px-2 outline-none active:border-grey-600 tracking-wider uppercase text-base hover:border-gray-700 text-black block"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="min-h-full bg-gradient-to-b from-white to-white/50" />
      </div>
    </header>
  );
};

export default Header;
