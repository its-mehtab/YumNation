import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import Button from "../button/Button";
import { ArrowRight } from "../../assets/icon/Icons";
import ProductModal from "../product-modal/ProductModal";

const Footer = () => {
  return (
    <>
      <footer className="pt-15 lg:pt-20 relative before:content-[''] before:absolute before:left-0 before:right-0 before:-top-20 before:bottom-0 before:bg-[#FFF7EA] before:-z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-10 gap-6 md:gap-2">
            <div className="md:col-span-3">
              <Link>
                <img src={assets.logoYellow} alt="Yum Nation" />
              </Link>
              <p className="font-medium text-[#333338] mt-2 mb-3 max-w-64">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
              <p className="font-medium text-[#333338]">support@example.com</p>
              <Link className="font-bold text-black mt-2">+(084) 456-0789</Link>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl text-black md:pb-4">QUICK LINKS</h3>
              <ul className="font-medium text-[#333338] capitalize gap-x-8 gap-y-4">
                <li className="mt-4">
                  <Link to="/">Home</Link>
                </li>
                <li className="mt-4">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="mt-4">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="mt-4">
                  <Link to="/contact">Contacts</Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl text-black md:pb-4">Products</h3>
              <ul className="font-medium text-[#333338] grid grid-cols-2 capitalize gap-x-8 gap-y-0">
                <li className="mt-4">
                  <Link>burgers</Link>
                </li>
                <li className="mt-4">
                  <Link>Kids Menus</Link>
                </li>
                <li className="mt-4">
                  <Link>King Delight Products</Link>
                </li>
                <li className="mt-4">
                  <Link>Desserts</Link>
                </li>
                <li className="mt-4">
                  <Link>Crispy Flavors</Link>
                </li>
                <li className="mt-4">
                  <Link>Beverages</Link>
                </li>
                <li className="mt-4">
                  <Link>Breakfast Products</Link>
                </li>
                <li className="mt-4">
                  <Link>Sauces</Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl text-black md:pb-4">OPENING HOURS</h3>
              <p className="font-medium text-[#333338] capitalize mt-4">
                Monday - Friday:{" "}
                <strong className="text-black">10am - 9pm</strong>
              </p>
              <p className="font-medium text-[#333338] capitalize mt-4">
                Saturday: <strong className="text-black">10am - 4pm</strong>
              </p>
            </div>
          </div>
          <div className="copyright-content mt-15 lg:mt-20 py-5 sm:py-10 border-t border-[#FFECD0]">
            <p className="text-sm text-[#66666A]">
              ©2025{" "}
              <span className="text-black font-[bangers]">Yum Nation</span>. All
              Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {/* <ProductModal /> */}
    </>
  );
};

export default Footer;
