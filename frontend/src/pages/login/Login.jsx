import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FacebookIcon, GoogleIcon } from "../../assets/icon/Icons";

const Login = () => {
  return (
    <section
      className="bg-cover bg-center flex items-center justify-center pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-white/20 mx-auto">
        <h2 className="text-3xl text-center text-white mb-6">Welcome Back</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
        />

        {/* Login Button */}
        <button className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition">
          Login
        </button>

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
