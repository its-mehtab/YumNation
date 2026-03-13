import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRestaurant } from "../../context/restaurant/RestaurantContext";

const steps = [
  { icon: "📝", label: "Application Submitted", done: true },
  { icon: "🔍", label: "Under Review", done: false, active: true },
  { icon: "📧", label: "Decision Email Sent", done: false },
  { icon: "🚀", label: "Dashboard Unlocked", done: false },
];

const RestaurantPendingApproval = () => {
  const { user, logout } = useAuth();
  const { restaurant } = useRestaurant();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div
        className="max-w-lg w-full space-y-4"
        style={{ animation: "fadeUp 0.5s ease both" }}
      >
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }`}</style>

        {/* ── Main card ── */}
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] p-8 text-center">
          {/* Animated hourglass */}
          <div
            className="w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center text-4xl mx-auto mb-5"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          >
            ⏳
          </div>
          <style>{`@keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }`}</style>

          <h1 className="text-xl font-bold text-gray-700 mb-2">
            Application Under Review
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hey <strong className="text-gray-600">{user?.firstName}</strong>!
            Your application for{" "}
            <strong className="text-[#fc8019]">
              {restaurant?.name || "your restaurant"}
            </strong>{" "}
            has been received. Our team typically reviews applications within{" "}
            <strong className="text-gray-600">2–3 business days</strong>.
          </p>

          {/* Progress steps */}
          <div className="mt-8 space-y-3 text-left">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${s.active ? "bg-orange-50 border border-orange-100" : s.done ? "bg-green-50" : "bg-gray-50"}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0
                  ${s.done ? "bg-green-100" : s.active ? "bg-orange-100" : "bg-gray-100"}`}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold
                    ${s.done ? "text-green-600" : s.active ? "text-[#fc8019]" : "text-gray-300"}`}
                  >
                    {s.label}
                  </p>
                </div>
                <div className="shrink-0">
                  {s.done && <span className="text-green-500 text-sm">✓</span>}
                  {s.active && (
                    <span className="text-xs bg-[#fc8019] text-white font-semibold px-2.5 py-1 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Info card ── */}
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            What to expect
          </p>
          <div className="space-y-2.5">
            {[
              {
                emoji: "📧",
                text: "You'll get an email when your application is approved or rejected",
              },
              { emoji: "⏱", text: "Review usually takes 2–3 business days" },
              {
                emoji: "📞",
                text: "Our team may contact you for additional information",
              },
              {
                emoji: "🔄",
                text: "Check back here anytime to see your status",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-base shrink-0">{item.emoji}</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => window.location.reload()}
            className="py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            🔄 Refresh Status
          </button>
          <button
            onClick={logout}
            className="py-3 rounded-xl border border-red-100 text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Have questions?{" "}
          <a
            href="mailto:support@yourapp.com"
            className="text-[#fc8019] font-medium hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default RestaurantPendingApproval;
