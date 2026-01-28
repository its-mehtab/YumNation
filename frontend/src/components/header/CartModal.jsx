import React, { useState } from "react";
import Button from "../button/Button";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const CartModal = ({ openCartModal, setOpenCartModal, products }) => {
  const { cart, setCart, loading, setLoading } = useCart();

  return (
    <>
      <div
        className={`${
          !openCartModal ? "translate-x-full" : "translate-x-0"
        } fixed top-0 bottom-0 right-0 w-full max-w-lg bg-white z-999 transition-all duration-500`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
          <h3 className="text-2xl">Shopping cart</h3>
          <div
            onClick={() => setOpenCartModal(false)}
            className="w-10 h-10 bg-[#fb9300] hover:bg-orange-500 text-white rounded-lg cursor-pointer flex justify-center items-center transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="px-5 pt-3 h-[calc(100%-170px)] overflow-y-scroll">
          <ul>
            {cart?.length > 0 ? (
              cart.map((currProd) => {
                return (
                  <CartItem
                    currProd={currProd}
                    products={products}
                    key={currProd._id}
                  />
                );
              })
            ) : (
              <li>Cart is Empty</li>
            )}
          </ul>
        </div>
        {cart?.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-300 bg-white flex gap-2 justify-between items-center">
            <div className="flex gap-2 flex-col">
              <span className="text-xl font-extrabold">Subtotal:</span>
              <span className="text-xl font-medium">
                $
                {cart?.length > 0 &&
                  cart.reduce((acc, currCart) => {
                    return currCart.price * currCart.quantity + acc;
                  }, 0)}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <Button btnName="Checkout" />
              {/* <Button /> */}
            </div>
          </div>
        )}
      </div>

      <span
        onClick={() => setOpenCartModal(false)}
        className={`${
          !openCartModal ? "translate-x-full" : "translate-x-0"
        } fixed left-0 right-0 top-0 bottom-0 z-10 bg-[rgba(0,0,0,0.4)] transition-all duration-500`}
      ></span>
    </>
  );
};

export default CartModal;
