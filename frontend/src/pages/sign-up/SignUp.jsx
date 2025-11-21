import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FacebookIcon, GoogleIcon } from "../../assets/icon/Icons";

const Signup = () => {
  const [role, setRole] = useState("user");

  return (
    <section
      className="bg-cover bg-center flex items-center justify-center pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-white/20">
        <h2 className="text-3xl text-center text-white mb-6">Create Account</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-white mb-2">Select your role:</p>

          <div className="flex gap-4">
            {/* USER BOX */}
            <div
              onClick={() => setRole("user")}
              className={`
        flex-1 cursor-pointer p-3 rounded-lg text-center font-semibold transition border 
        ${
          role === "user"
            ? "bg-white text-black border-[#FB9300]"
            : "bg-white/20 text-white border-white/30 hover:bg-white/30"
        }
      `}
            >
              Normal User
            </div>

            {/* ADMIN BOX */}
            <div
              onClick={() => setRole("admin")}
              className={`
        flex-1 cursor-pointer p-3 rounded-lg text-center font-semibold transition border 
        ${
          role === "admin"
            ? "bg-white text-black border-[#FB9300]"
            : "bg-white/20 text-white border-white/30 hover:bg-white/30"
        }
      `}
            >
              Admin
            </div>
          </div>
        </div>

        {/* Signup Button */}
        <button className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition">
          Sign Up
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
      </div>
    </section>
  );
};

export default Signup;
