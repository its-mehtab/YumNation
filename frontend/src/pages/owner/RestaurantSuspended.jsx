import React from "react";
import { useAuth } from "../../context/user/AuthContext";
import { useRestaurant } from "../../context/owner/RestaurantContext";
import { Ban, OctagonAlert, PackageX, Lock, Mail, ClipboardList, RefreshCcw } from "lucide-react";

const RestaurantSuspended = () => {
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
        <div className="bg-white rounded-md shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] p-8 text-center">
          <div className="w-20 h-20 rounded-md bg-gray-100 border-2 border-gray-200 flex items-center justify-center mx-auto mb-5">
            <Ban size={40} className="text-gray-400"  strokeWidth={1.5} />
          </div>

          <h1 className="text-xl font-bold text-gray-700 mb-2">
            Restaurant Suspended
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hey <strong className="text-gray-600">{user?.firstName}</strong>,
            your restaurant{" "}
            <strong className="text-[#fc8019]">{restaurant?.name}</strong> has
            been temporarily suspended by our team. You cannot accept orders or
            access your dashboard during this period.
          </p>

          {/* What this means */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-md px-5 py-4 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              What this means
            </p>
            <div className="space-y-2.5">
              {[
                {
                  icon: <OctagonAlert size={20} className="text-gray-500" />,
                  text: "Your restaurant is hidden from customers",
                },
                { icon: <PackageX size={20} className="text-gray-500" />, text: "No new orders can be placed" },
                { icon: <Lock size={20} className="text-gray-500" />, text: "Dashboard access is restricted" },
                {
                  icon: <Mail size={20} className="text-gray-500" />,
                  text: "You will be notified when the suspension is lifted",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 pt-0.5">{item.icon}</span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contact card ── */}
        <div className="bg-white rounded-md border border-gray-200 hover:shadow-md transition-all p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            What to do next
          </p>
          <div className="space-y-2.5">
            {[
              {
                icon: <Mail size={20} className="text-gray-500" />,
                text: "Contact our support team to understand the reason for suspension",
              },
              {
                icon: <ClipboardList size={20} className="text-gray-500" />,
                text: "Resolve any outstanding issues flagged by our team",
              },
              {
                icon: <RefreshCcw size={20} className="text-gray-500" />,
                text: "Once resolved, your account will be reinstated",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 pt-0.5">{item.icon}</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="mailto:support@yourapp.com"
            className="flex items-center justify-center gap-2 py-3 rounded-md border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors text-center"
          >
            <Mail size={16} /> Contact Support
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

export default RestaurantSuspended;
