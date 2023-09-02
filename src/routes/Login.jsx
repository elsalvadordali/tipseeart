import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import SuccessToast from "../components/SuccessToast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (formData.email && formData.password) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("token", user.accessToken);
          localStorage.setItem("uid", user.auth.currentUser.uid);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          if (err.code == "auth/user-not-found") {
            setError((prev) => ({
              ...prev,
              email: "Please create an account first",
            }));
          } else {
            setError((prev) => ({ ...prev, email: err.code }));
          }
        });
    } else {
      const emailError = formData.email ? "" : "Please enter an email";
      const passwordError = formData.password ? "" : "Please enter a password";
      setError((prev) => ({
        ...prev,
        email: emailError,
        password: passwordError,
      }));
    }
  }
  if (isLoggedIn) return <Navigate to="/auth/edit-profile" />;


  return (
    <div className="flex flex-col items-center justify-center py-6 relative">
      {isLoggedIn && <SuccessToast toastType={"login"} />}
      <h1 className="font-extralight text-6xl mb-12">Login</h1>
      <form className="flex flex-col w-5/6 lg:w-1/3" onSubmit={onSubmit}>
        <label htmlFor="email" className="mt-4 text-xl font-medium">
          Email
        </label>
        <input
          autoComplete="on"
          type="text"
          name="email"
          id="email"
          className="border-2 border-gray-200 py-2 px-4 outline-none focus:border-gray-700"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        {error.email && <p className="red">{error.email}</p>}
        <label htmlFor="password" className="mt-4 text-xl font-medium">
          Password
        </label>
        <input
          autoComplete="on"
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
      <Link to={"/signup"} className="mt-4 text-xl font-normal underline">
        Need an account?
      </Link>
    </div>
  );
};

export default Login;
