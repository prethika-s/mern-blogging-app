import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";
import AUTH_IMG from "../../assets/AUTHLogo.png";
import Input from "../Inputs/Input";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");
  const [error, setError] = useState(null);
  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password.");
    setError("");

    let profileImageUrl = "";
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminAccessToken,
      });

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
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1 mb-5">Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="John" type="text" />
            <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
            <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" />
            <Input value={adminAccessToken} onChange={({ target }) => setAdminAccessToken(target.value)} label="Admin Invite Token" placeholder="6 digit code" type="number" />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">SIGN UP</button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account? <button onClick={() => setCurrentPage("login")} className="text-primary underline">Login</button>
          </p>
        </form>
      </div>
      <div className="hidden md:flex items-center justify-center w-[40%] bg-gray-50">
        <img src={AUTH_IMG} alt="SignUp Visual" className="max-w-xs w-full object-contain" />
      </div>
    </div>
  );
};

export default SignUp;
