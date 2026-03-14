import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRestaurant } from "../../context/restaurant/RestaurantContext";

const RestaurantRejectedPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showReapply, setShowReapply] = useState(false);

  const { restaurant } = useRestaurant();

  const reason = restaurant?.rejectionReason || null;

  const commonReasons = [
    { emoji: "📄", text: "Incomplete or inaccurate information provided" },
    { emoji: "📍", text: "Address could not be verified" },
    { emoji: "🖼️", text: "Missing or low quality images" },
    { emoji: "📞", text: "Contact details could not be verified" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 fade-up">
      <div className="max-w-lg w-full space-y-4">
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center text-4xl mx-auto mb-5">
            😔
          </div>

          <h1 className="text-xl font-bold text-gray-700 mb-2">
            Application Rejected
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hey <strong className="text-gray-600">{user?.firstName}</strong>,
            unfortunately your application for{" "}
            <strong className="text-red-400">
              {restaurant?.name || "your restaurant"}
            </strong>{" "}
            was not approved this time.
          </p>

          {reason ? (
            <div className="mt-6 bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
                Reason from Admin
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
            </div>
          ) : (
            <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Common Rejection Reasons
              </p>
              <div className="space-y-2">
                {commonReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm shrink-0">{r.emoji}</span>
                    <p className="text-xs text-gray-500">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Link
              to={"/restaurant"}
              className="block w-full bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              🔄 Reapply Now
            </Link>
            <p className="text-xs text-gray-400">
              Fix the issues above and submit a new application.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Tips for a successful application
          </p>
          <div className="space-y-2.5">
            {[
              {
                emoji: "✍️",
                text: "Write a clear, detailed description of your restaurant and cuisine",
              },
              {
                emoji: "📸",
                text: "Upload a high quality logo and cover image",
              },
              {
                emoji: "📍",
                text: "Make sure your address is complete and accurate",
              },
              {
                emoji: "📞",
                text: "Use a valid phone number and email you have access to",
              },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-base shrink-0">{tip.emoji}</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="mailto:support@yourapp.com"
            className="py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors text-center"
          >
            📧 Contact Support
          </a>
          <button
            onClick={logout}
            className="py-3 rounded-xl border border-red-100 text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Need help?{" "}
          <a
            href="mailto:support@yourapp.com"
            className="text-[#fc8019] font-medium hover:underline"
          >
            support@yourapp.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default RestaurantRejectedPage;
