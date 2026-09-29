import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/user/AuthContext";
import {
  Search,
  ChevronDown,
  User,
  Heart,
  ShoppingBag,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

const AdminHeader = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100/50 flex items-center justify-between px-8 shrink-0 z-20">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 transition-colors focus-within:bg-white focus-within:border-[#fc8019] focus-within:ring-4 focus-within:ring-[#fc8019]/10">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-none outline-none text-sm text-gray-700 px-3 placeholder:text-gray-400"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute 1 top-0 right-0 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer select-none"
          >
            <img
              className="rounded-full w-9 h-9 object-cover"
              src={assets.avatar}
              alt="avatar"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 capitalize">
                {user?.firstName || "Admin"}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
              isOpen
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            }`}
          >
            {isLoggedIn && (
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-50 mb-2">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Account
                  </p>
                </div>

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#fc8019] transition-colors"
                >
                  <User size={16} />
                  Profile
                </a>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#fc8019] transition-colors"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#fc8019] transition-colors"
                >
                  <ShoppingBag size={16} />
                  Orders
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#fc8019] transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </a>

                <div className="h-px bg-gray-100 my-2"></div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
