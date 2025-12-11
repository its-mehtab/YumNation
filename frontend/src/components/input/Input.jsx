import React from "react";

const Input = ({ name, type = "text", value, onChange, placeholder }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 mb-4 rounded-lg border border-white/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FB9300]"
    />
  );
};

export default Input;
