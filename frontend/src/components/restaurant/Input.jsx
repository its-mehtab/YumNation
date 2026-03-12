import React from "react";

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors bg-white"
  />
);

export default Input;
