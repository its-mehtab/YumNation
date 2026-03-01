import React from "react";

const Input = ({ name, type = "text", value, onChange, placeholder }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2.5 mb-4 text-sm rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
  );
};

export default Input;
