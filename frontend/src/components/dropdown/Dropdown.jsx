import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import { UserIcon } from "../../assets/icon/Icons";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { serverURL, user, setUser } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const logout = async () => {
    try {
      const { data } = await axios.post(
        serverURL + "/api/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-[#3f9065] transition-all cursor-pointer mt-1"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdownInformation"
      >
        <UserIcon />
      </button>

      {isOpen && (
        <div
          id="dropdownInformation"
          className="z-10 bg-[#FB9300] border border-[#f18d00] rounded-2xl shadow-lg w-72 absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2"
        >
          {!user ? (
            <ul
              className="px-2 pb-2 text-sm text-body font-medium"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                >
                  <svg
                    className="w-4 h-4 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                >
                  <svg
                    className="w-4 h-4 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                    />
                  </svg>
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <div className="p-2">
                <div className="flex items-center px-2.5 p-2 space-x-1.5 text-sm hover:bg-orange-500 rounded-xl">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={assets.avatar}
                    alt="Rounded avatar"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-heading capitalize">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className="truncate text-body">{user?.email}</div>
                  </div>
                </div>
              </div>

              <ul
                className="px-2 pb-2 text-sm text-body font-medium"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth={2}
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                      />
                    </svg>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                      />
                    </svg>
                    Notifications
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-orange-500 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Help center
                  </a>
                </li>
                <li className="border-t border-white/20 pt-1 mt-1.5">
                  <div
                    onClick={logout}
                    className="inline-flex items-center w-full p-2 text-fg-danger hover:bg-orange-500 rounded-xl cursor-pointer-lg"
                  >
                    <svg
                      className="w-4 h-4 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                      />
                    </svg>
                    Sign out
                  </div>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
