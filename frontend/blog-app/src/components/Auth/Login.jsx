import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { validateEmail } from "../../utils/helper";
import AUTH_IMG from "../../assets/AUTHLogo.png";
import Input from "../Inputs/Input";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password.");
    setError("");

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, role } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);
        setOpenAuthForm(false);
        navigate(role === "admin" ? "/admin/dashboard" : "/");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center w-full">
      <div className="w-full md:w-[60%] p-6 md:p-10">
        <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-5">Please enter your details to log in.</p>
        <form onSubmit={handleLogin}>
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">LOGIN</button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account? <button onClick={() => setCurrentPage("signup")} className="text-primary underline">SignUp</button>
          </p>
        </form>
      </div>
      <div className="hidden md:flex items-center justify-center w-[40%] bg-gray-50">
        <img src={AUTH_IMG} alt="Login Visual" className="max-w-xs w-full object-contain" />
      </div>
    </div>
  );
};

export default Login;
