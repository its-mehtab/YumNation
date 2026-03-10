import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../../assets/icon/Check Mark.json";
import { FailedIcon } from "../../assets/icon/Icons";
import { useLocation, useNavigate } from "react-router-dom";

const SummaryRow = ({ label, value, highlight }) => (
  <div
    className={`flex justify-between py-2 text-sm border-b border-gray-100 last:border-0 ${highlight ? "font-semibold text-[#fc8019]" : "text-gray-600"}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const ThankYou = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;
  const status = state?.status || "success";
  const isSuccess = status === "success";

  const eta = new Date(Date.now() + 40 * 60 * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="flex items-center justify-center mt-4">
      <div
        className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] w-full max-w-md p-8 flex flex-col items-center text-center"
        style={{ animation: "fadeUp 0.5s ease both" }}
      >
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-5px); }
            80%      { transform: translateX(5px); }
          }
        `}</style>

        {isSuccess ? (
          <div className="max-h-24 flex items-center">
            <Lottie
              animationData={successAnimation}
              loop={true}
              autoplay={true}
              style={{ width: 160, height: 160, marginInline: "auto" }}
            />
          </div>
        ) : (
          <div style={{ animation: "shake 0.6s ease 0.2s both" }}>
            <FailedIcon />
          </div>
        )}

        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          {isSuccess ? "Order Placed! 🎉" : "Payment Failed"}
        </h1>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {isSuccess
            ? `Your order is confirmed and will arrive by ${eta}. Sit tight!`
            : "Something went wrong while processing your payment. Your cart is safe — please try again."}
        </p>

        {/* ── Order Summary (success only) ── */}
        {isSuccess && order && (
          <div className="w-full mt-6 bg-gray-50 rounded-md p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Order Summary
            </p>

            <SummaryRow
              label="Order ID"
              value={`#${order._id?.slice(-6).toUpperCase()}`}
            />
            <SummaryRow
              label="Items"
              value={order.items?.map((i) => i.name).join(", ")}
            />
            <SummaryRow
              label="Deliver to"
              value={`${order.deliveryAddress?.city}, ${order.deliveryAddress?.state}`}
            />
            <SummaryRow
              label="Payment"
              value={
                order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"
              }
            />
            <SummaryRow
              label="Total"
              value={`$${order.totalAmount?.toFixed(2)}`}
              highlight
            />
          </div>
        )}

        {isSuccess && (
          <div className="w-full mt-4 flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-md px-4 py-3">
            <span className="text-xl">🛵</span>
            <div className="text-left">
              <p className="text-xs text-gray-500">Estimated Delivery</p>
              <p className="text-sm font-semibold text-[#fc8019]">{eta}</p>
            </div>
          </div>
        )}

        <div className="w-full mt-6 flex flex-col gap-3">
          {isSuccess ? (
            <>
              <button
                onClick={() => navigate("/orders")}
                className="w-full bg-[#fc8019] text-white py-3 rounded-md cursor-pointer text-sm font-semibold hover:bg-[#e57215] transition-colors"
              >
                Track My Order
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#fc8019] text-white py-3 rounded-md cursor-pointer text-sm font-semibold hover:bg-[#e5721f] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
