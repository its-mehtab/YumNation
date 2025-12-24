import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useValidate } from "../../context/ValidateContext";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [validateError, setValidateError] = useState({});
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();
  const { validateEmail, validateLogin } = useValidate();

  const navigate = useNavigate();

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedEmail = forgotPasswordData.email.trim().toLowerCase();

    const newError = validateEmail(trimmedEmail);

    if (newError.email) {
      setError(newError.email);
      return null;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverURL}/api/sendotp`,
        { email: trimmedEmail },
        { withCredentials: true }
      );

      setStep(2);
      console.log(res);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedData = {
      email: forgotPasswordData.email.trim().toLowerCase(),
      otp: forgotPasswordData.otp.trim(),
    };

    const newError = validateEmail(trimmedData.email);

    if (newError.email) {
      setError(newError.email);
      return null;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverURL}/api/verifyotp`,
        { email: trimmedData.email, otp: trimmedData.otp },
        { withCredentials: true }
      );

      setStep(3);
      console.log(res);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setError("");
    setValidateError({});

    if (
      forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword
    ) {
      setError("Password does not match");
      return null;
    }

    const trimmedData = {
      email: forgotPasswordData.email.trim().toLowerCase(),
      otp: forgotPasswordData.otp.trim(),
      password: forgotPasswordData.newPassword,
    };

    const validationErrors = validateLogin(trimmedData);

    if (Object.keys(validationErrors).length > 0) {
      setValidateError(validationErrors);
      return null;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverURL}/api/resetpassword`,
        { email: trimmedData.email, newPassword: trimmedData.password },
        { withCredentials: true }
      );

      console.log(res);

      setForgotPasswordData({
        email: "",
        otp: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
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
        {validateError &&
          Object.values(validateError).map((err, i) => (
            <div key={i} className="text-red-600 mb-2 capitalize">
              {err}
            </div>
          ))}
        {error && <div className="text-red-600 mb-2 capitalize">{error}</div>}
        {step === 1 && (
          <form onSubmit={sendOtpHandler}>
            <Input
              name="email"
              placeholder="Email Address"
              value={forgotPasswordData.email}
              onChange={handleDataChange}
            />

            <button
              type="submit"
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
                loading
                  ? "bg-white text-black cursor-not-allowed"
                  : "bg-[#FB9300] text-white hover:bg-white hover:text-black cursor-pointer"
              }`}
              disabled={loading}
            >
              {!loading ? "Send Otp" : "Loading..."}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtpHandler}>
            <Input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleDataChange}
              value={forgotPasswordData.otp}
            />

            <button
              type="submit"
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
                loading
                  ? "bg-white text-black cursor-not-allowed"
                  : "bg-[#FB9300] text-white hover:bg-white hover:text-black cursor-pointer"
              }`}
              disabled={loading}
            >
              {!loading ? "Verify Otp" : "Loading..."}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={resetPasswordHandler}>
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={forgotPasswordData.newPassword}
              onChange={handleDataChange}
            />
            <Input
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm Password"
              value={forgotPasswordData.confirmNewPassword}
              onChange={handleDataChange}
            />

            <button
              type="submit"
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
                loading
                  ? "bg-white text-black cursor-not-allowed"
                  : "bg-[#FB9300] text-white hover:bg-white hover:text-black cursor-pointer"
              }`}
              disabled={loading}
            >
              {!loading ? "Reset Password" : "Loading..."}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
