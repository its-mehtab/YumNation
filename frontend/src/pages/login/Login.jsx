import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FacebookIcon, GoogleIcon } from "../../assets/icon/Icons";
import { useValidate } from "../../context/ValidateContext";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [backendError, setBackendError] = useState("");

  const URL = "http://localhost:4000/";

  const { validateLogin } = useValidate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    setError({});

    const trimmedData = {
      ...loginData,
      email: loginData.email.trim(),
    };

    const validationErrors = validateLogin(trimmedData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const data = await axios.post(
        URL + "api/login",
        {
          email: trimmedData.email.toLocaleLowerCase(),
          password: trimmedData.password,
        },
        { withCredentials: true }
      );

      setLoginData({
        email: "",
        password: "",
      });
      console.log(data);
    } catch (error) {
      setBackendError(error.response?.data?.message || error.message);
    }
  };

  return (
    <section
      className="bg-cover bg-center flex items-center justify-center pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-white/20 mx-auto">
        <h2 className="text-3xl text-center text-white mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {error.email && (
            <div className="text-red-600 mb-2">{error.email}</div>
          )}
          {backendError && (
            <div className="text-red-600 mb-2">{backendError}</div>
          )}
          <input
            name="email"
            placeholder="Email Address"
            className="w-full p-3 mb-4 rounded-lg border border-white/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
            value={loginData.email}
            onChange={handleChange}
          />
          {error.password && (
            <div className="text-red-600 mb-2">{error.password}</div>
          )}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-lg border border-white/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
            value={loginData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition"
          >
            Login
          </button>
        </form>

        {/* OAuth */}
        <div className="mt-6">
          <p className="text-center text-white mb-3">Or continue with</p>
          <div className="flex gap-4">
            <button className="w-1/2 bg-white text-black font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-200 transition cursor-pointer">
              <GoogleIcon />
              Google
            </button>
            <button className="w-1/2 bg-[#1877F2] text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#0f5ec7] transition cursor-pointer">
              <FacebookIcon />
              Facebook
            </button>
          </div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-white mt-6">
          Don't have an account?
          <Link to="/signup" className="text-white font-medium ms-1">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
