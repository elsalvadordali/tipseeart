import axios from "axios";
import { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import SuccessToast from "../components/SuccessToast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('token') ? true : false;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formCompleted, setFormCompleted] = useState(false);

  // Redirects authenticated user from login page.
  useEffect(() => {
    if (isAuthenticated === true && formCompleted === false) {
      return navigate("/");
    }
  }, [isAuthenticated, formCompleted]);

  async function onSubmit(e) {
    e.preventDefault();
    console.log("logging in", formData.email, formData.password);
    if (formData.email && formData.password) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          sessionStorage.setItem('token', user.accessToken)
          localStorage.setItem('uid', user.auth.currentUser.uid)
          redirect('/profile')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      //TODO USER NEEDS TO FILL IN BOTH FIELDS
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 relative">
      {formCompleted && <SuccessToast toastType={"login"} />}
      <h1 className="font-extralight text-6xl mb-12">Login</h1>
      <form className="flex flex-col w-5/6 lg:w-1/3" onSubmit={onSubmit}>
        <label htmlFor="email" className="mt-4 text-xl font-medium">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <label htmlFor="password" className="mt-4 text-xl font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="border-2 border-gray-200 py-2 px-4 outline-none active:border-grey-600 mt-6 tracking-wider uppercase text-xl hover:border-gray-700"
        >
          Login
        </button>
      </form>
      <Link to={"/register"} className="mt-4 text-xl font-normal underline">
        Need an account?
      </Link>
    </div>
  );
};

export default Login;
