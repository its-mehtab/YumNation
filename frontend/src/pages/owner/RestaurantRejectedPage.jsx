import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/user/AuthContext";
import { useRestaurant } from "../../context/owner/RestaurantContext";
import { FileText, MapPin, Image as ImageIcon, Phone, Frown, RefreshCw, PenTool, Camera, Mail } from "lucide-react";

const RestaurantRejectedPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showReapply, setShowReapply] = useState(false);

  const { restaurant } = useRestaurant();

  const reason = restaurant?.rejectionReason || null;

  const commonReasons = [
    { icon: <FileText size={16} className="text-gray-400" />, text: "Incomplete or inaccurate information provided" },
    { icon: <MapPin size={16} className="text-gray-400"  strokeWidth={1.5} />, text: "Address could not be verified" },
    { icon: <ImageIcon size={16} className="text-gray-400" />, text: "Missing or low quality images" },
    { icon: <Phone size={16} className="text-gray-400"  strokeWidth={1.5} />, text: "Contact details could not be verified" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 fade-up">
      <div className="max-w-lg w-full space-y-4">
        <div className="bg-white rounded-md shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] p-8 text-center">
          <div className="w-20 h-20 rounded-md bg-red-50 border-2 border-red-100 flex items-center justify-center mx-auto mb-5">
            <Frown size={40} className="text-red-400" />
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
            <div className="mt-6 bg-red-50 border border-red-100 rounded-md px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
                Reason from Admin
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
            </div>
          ) : (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-md px-5 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Common Rejection Reasons
              </p>
              <div className="space-y-2">
                {commonReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0">{r.icon}</span>
                    <p className="text-xs text-gray-500">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Link
              to={"/restaurant"}
              className="block w-full bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold py-3 rounded-md transition-colors"
            >
              <span className="flex items-center justify-center gap-2"><RefreshCw size={16} /> Reapply Now</span>
            </Link>
            <p className="text-xs text-gray-400">
              Fix the issues above and submit a new application.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-md border border-gray-200 hover:shadow-md transition-all p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Tips for a successful application
          </p>
          <div className="space-y-2.5">
            {[
              {
                icon: <PenTool size={18} className="text-gray-400" />,
                text: "Write a clear, detailed description of your restaurant and cuisine",
              },
              {
                icon: <Camera size={18} className="text-gray-400" />,
                text: "Upload a high quality logo and cover image",
              },
              {
                icon: <MapPin size={18} className="text-gray-400"  strokeWidth={1.5} />,
                text: "Make sure your address is complete and accurate",
              },
              {
                icon: <Phone size={18} className="text-gray-400"  strokeWidth={1.5} />,
                text: "Use a valid phone number and email you have access to",
              },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0">{tip.icon}</span>
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
            className="py-3 rounded-md border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors text-center"
          >
            <span className="flex items-center justify-center gap-2"><Mail size={16} /> Contact Support</span>
          </a>
          <button
            onClick={logout}
            className="py-3 rounded-md border border-red-100 text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors"
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
