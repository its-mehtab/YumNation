import React from "react";

const Button = ({
  children,
  btnColor = "bg-[#fc8019] text-white hover:bg-[#df6703]",
  addClass = "",
}) => (
  <div
    className={`inline-block text-sm font-medium px-6 py-3 rounded-md transition-all ${btnColor} ${addClass} cursor-pointer`}
  >
    {children}
  </div>
);

export default Button;
