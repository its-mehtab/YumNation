import React from "react";
import { BtnArrowIcon } from "../../assets/icon/Icons";

const Button = ({
  btnName = "ORDER NOW",
  btnColor = "bg-[#FB9300] text-white hover:bg-[#027a36]",
  addClass = "",
}) => (
  <div
    href="#"
    className={`inline-flex gap-2.5 font-[bangers] px-10 py-4.5 rounded-xl shadow-[2px_2px_0px_2px_rgba(0,0,0)] transition-all duration-300 ease-in-out ${btnColor} ${addClass}`}
  >
    {btnName}
    <BtnArrowIcon />
  </div>
);

export default Button;
