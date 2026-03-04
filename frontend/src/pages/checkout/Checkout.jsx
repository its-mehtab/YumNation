import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { LocationIcon } from "../../assets/icon/Icons";
import { assets } from "../../assets/assets";
import AddressBox from "../../components/address-box/AddressBox";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Skeleton } from "@radix-ui/themes";
import { useAddress } from "../../context/AddressContext";
import CartSkeleton from "../../components/skeleton/CartSkeleton";
import PaymentBox from "./PaymentBox";
import axios from "axios";

const Checkout = () => {
  const [error, setError] = useState("");

  const { cart, setCart, loading: cartLoading } = useCart();
  const { loading: addressLoading } = useAddress();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="p-6 rounded-lg border border-gray-300">
          <Skeleton loading={addressLoading}>
            <h2 className="text-lg text-gray-600 font-semibold mb-2">
              Delivery Address
            </h2>
          </Skeleton>

          <AddressBox />
        </div>

        <div className="p-6 rounded-lg border border-gray-300 mt-3">
          {error && (
            <Skeleton loading={cartLoading}>
              <h3 className="text-md text-red-600 font-semibold mb-1">
                {error}
              </h3>
              <p className="mb-5 text-gray-500">
                Some items in your order are currently low on stock or
                unavailable. We’ve updated your cart totals—please review them
                before checking out.
              </p>
            </Skeleton>
          )}
          <Skeleton loading={cartLoading}>
            <h2 className="text-xl text-gray-600 font-semibold mb-4">
              Order Summary
            </h2>
          </Skeleton>

          {cartLoading ? (
            <CartSkeleton />
          ) : (
            cart.map((currProd) => (
              <div
                key={currProd._id}
                className="flex flex-wrap gap-4 items-center py-3"
              >
                <Link
                  to={`/product/${currProd.product.slug}`}
                  className={`w-17.5 min-w-17.5 h-17.5 rounded-lg border flex justify-center items-center border-[#fc8019] ${currProd.product.stock <= 0 || !currProd.product.isAvailable ? "grayscale" : ""}`}
                >
                  {/* <img src={currProd.image} alt="" className="w-full" /> */}
                  <img src={assets.product2} alt="" className="w-full" />
                </Link>
                <div>
                  <h3 className="font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
                    <Link to={`/product/${currProd.product.slug}`}>
                      {currProd.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    ${currProd.price.toFixed(2)} × {currProd.quantity}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {currProd.variant}
                  </p>
                </div>
                <div className="md:ml-auto text-end">
                  <div className="text-md font-semibold text-[#fc8019]">
                    +${(currProd.price * currProd.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div>
        <PaymentBox setError={setError} />
      </div>
    </div>
  );
};

export default Checkout;
