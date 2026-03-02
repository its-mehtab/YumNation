import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  btnColor = "bg-[#fc8019] text-white hover:bg-[#df6703]",
  addClass = "",
  to,
  onClick,
  type = "button",
}) => {
  const baseClasses = `inline-block text-sm font-medium px-6 py-3 rounded-md transition-all ${btnColor} ${addClass} cursor-pointer`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};

export default Button;
