import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section
      className="bg-cover bg-center  pt-34 pb-28"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-white text-[210px] text-center">
          Contact
        </h1>
        <ul className="flex justify-center">
          <li>
            <Link href="/" className="text-xl font-semibold text-white">
              Home
            </Link>
          </li>
          <li className="text-xl text-white before:content-['-'] before:mx-2">
            Contact
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
