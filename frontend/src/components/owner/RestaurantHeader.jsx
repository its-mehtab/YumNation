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
  Menu,
} from "lucide-react";

const RestaurantHeader = ({ onToggleSidebar }) => {
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
    <header className="h-20 bg-transparent flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-20 gap-3">
      {/* Mobile Menu Button */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors shrink-0"
        title="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      {/* Search Bar */}
      <div className="hidden sm:flex items-center w-full max-w-md bg-white/10 border border-white/20 rounded-md px-4 py-2.5 transition-colors focus-within:bg-white/20">
        <Search size={18} className="text-white shrink-0" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-none outline-none text-sm text-white px-3 placeholder:text-white/70"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-6 ml-auto">
        <button className="text-white hover:text-white/80 transition-colors relative p-1">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 sm:gap-3 p-1 pr-2 sm:pr-3 rounded-md border border-white/20 hover:bg-white/10 transition-colors cursor-pointer select-none"
          >
            <img
              className="rounded-full w-8 h-8 sm:w-9 sm:h-9 object-cover"
              src={assets.avatar}
              alt="avatar"
            />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-semibold text-white capitalize truncate max-w-20 sm:max-w-none">
                {user?.firstName || "Owner"}
              </span>
              <ChevronDown
                size={14}
                className={`text-white/80 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
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

                <Link
                  to="/owner/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-[#fff2e8] hover:text-[#fc8019] transition-colors"
                >
                  <User size={16} />
                  Profile
                </Link>
                <Link
                  to="/owner/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-[#fff2e8] hover:text-[#fc8019] transition-colors"
                >
                  <Settings size={16} strokeWidth={1.5} />
                  Settings
                </Link>

                <div className="h-px bg-gray-100 my-2"></div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} strokeWidth={1.5} />
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

export default RestaurantHeader;
