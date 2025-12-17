import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FacebookIcon, GoogleIcon } from "../../assets/icon/Icons";
import { useValidate } from "../../context/ValidateContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/input/Input";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState();

  const { serverURL, getUserData, setUser } = useAuth();

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
      email: loginData.email.trim().toLowerCase(),
    };

    const validationErrors = validateLogin(trimmedData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        serverURL + "api/login",
        {
          email: trimmedData.email,
          password: trimmedData.password,
        },
        { withCredentials: true }
      );

      setUser(data);
      getUserData();

      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      setBackendError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
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
          <Input
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
          />
          {error.password && (
            <div className="text-red-600 mb-2">{error.password}</div>
          )}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />

          <Link
            to="/forgot-password"
            className="text-white mb-2.5 float-right inline-block"
          >
            Forgot Password?
          </Link>

          {/* <button
            type="submit"
            className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition"
          >
            Login
          </button> */}
          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
              loading
                ? "bg-white text-black cursor-not-allowed"
                : "bg-[#FB9300] text-white hover:bg-white hover:text-black cursor-pointer"
            }`}
            disabled={loading}
          >
            {!loading ? "Login" : "Loading..."}
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
