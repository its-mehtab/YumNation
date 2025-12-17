import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FacebookIcon, GoogleIcon } from "../../assets/icon/Icons";
import Input from "../../components/input/Input";
import { useValidate } from "../../context/ValidateContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState({});
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const { validate } = useValidate();
  const { serverURL, setUser, getUserData } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    setError({});

    const trimmedData = {
      ...signUpData,
      firstName: signUpData.firstName.trim().toLowerCase(),
      lastName: signUpData.lastName.trim().toLowerCase(),
      email: signUpData.email.trim().toLowerCase(),
    };

    const validationErrors = validate(trimmedData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        serverURL + "api/signUp",
        {
          firstName: trimmedData.firstName,
          lastName: trimmedData.lastName,
          email: trimmedData.email,
          password: trimmedData.password,
          role: trimmedData.role,
        },
        { withCredentials: true }
      );

      setUser(data);
      getUserData();

      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
      console.log(data);
    } catch (error) {
      setBackendError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }

    // console.log(signUpData);
    // console.log(matchPassword);
  };

  return (
    <section
      className="bg-cover bg-center flex items-center justify-center pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-lg shadow-xl border border-white/20">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center text-white mb-6">
            Create Account
          </h2>
          {backendError && (
            <div className="text-red-600 mb-2">{backendError}</div>
          )}
          {error.firstName && (
            <div className="text-red-600 mb-2">{error.firstName}</div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="firstName"
              placeholder="First Name"
              value={signUpData.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={signUpData.lastName}
              onChange={handleChange}
            />
          </div>
          {error.email && (
            <div className="text-red-600 mb-2">{error.email}</div>
          )}
          <Input
            name="email"
            placeholder="Email Address"
            value={signUpData.email}
            onChange={handleChange}
          />
          {error.password && (
            <div className="text-red-600 mb-2">{error.password}</div>
          )}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleChange}
          />
          {error.confirmPassword && (
            <div className="text-red-600 mb-2">{error.confirmPassword}</div>
          )}
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={handleChange}
          />

          <div className="mb-6">
            <p className="text-white mb-2">Select your role:</p>

            <div className="flex gap-4">
              <div
                onClick={() => setSignUpData({ ...signUpData, role: "user" })}
                className={`
          flex-1 cursor-pointer p-3 rounded-lg text-center font-semibold transition border 
          ${
            signUpData.role === "user"
              ? "bg-white text-black border-[#FB9300]"
              : "border-white/50 text-white hover:bg-white/30"
          }
        `}
              >
                Normal User
              </div>

              <div
                onClick={() => setSignUpData({ ...signUpData, role: "admin" })}
                className={`
          flex-1 cursor-pointer p-3 rounded-lg text-center font-semibold transition border 
          ${
            signUpData.role === "admin"
              ? "bg-white text-black border-[#FB9300]"
              : "border-white/50 text-white hover:bg-white/30"
          }
        `}
              >
                Admin
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
              loading
                ? "bg-white text-black cursor-not-allowed"
                : "bg-[#FB9300] text-white hover:bg-white hover:text-black cursor-pointer"
            }`}
            disabled={loading}
          >
            {!loading ? "Sign Up" : "Loading..."}
          </button>

          {/* OAuth */}
          <div className="mt-6">
            <p className="text-center text-white mb-3">Or sign up with</p>

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

          {/* Login Link */}
          <p className="text-center text-white mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
