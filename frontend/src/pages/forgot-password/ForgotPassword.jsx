import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  return (
    <section
      className="bg-cover bg-center flex items-center justify-center pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-white/20 mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/login"
            className="text-white rounded-md bg-[#FB9300] w-11 h-11 flex justify-center items-center hover:bg-white hover:text-[#3F9065] cursor-pointer transition"
          >
            <svg
              id="Layer_2"
              height={20}
              width={20}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 2"
              fill="currentColor"
            >
              <path d="m22 11h-17.586l5.293-5.293a1 1 0 1 0 -1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414l-5.293-5.293h17.586a1 1 0 0 0 0-2z" />
            </svg>
          </Link>
          <h2 className="text-3xl text-white">Forgot Password?</h2>
        </div>

        {step === 1 && (
          <form>
            <Input name="email" placeholder="Email Address" />

            <button
              type="submit"
              className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition"
            >
              Send Otp
            </button>
          </form>
        )}

        {step === 2 && (
          <form>
            <Input name="otp" type="number" placeholder="Enter OTP" />

            <button
              type="submit"
              className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition"
            >
              Verify Otp
            </button>
          </form>
        )}

        {step === 3 && (
          <form>
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="w-full bg-[#FB9300] text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black cursor-pointer transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
