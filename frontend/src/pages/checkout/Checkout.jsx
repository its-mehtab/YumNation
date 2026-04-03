import React, { useState } from "react";
import { LocationIcon, StarIcon, TimeIcon } from "../../assets/icon/Icons";
import { assets } from "../../assets/assets";
import AddressBox from "../../components/address-box/AddressBox";
import { useCart } from "../../context/user/CartContext";
import { Link } from "react-router-dom";
import { Skeleton } from "@radix-ui/themes";
import { useAddress } from "../../context/user/AddressContext";
import CartSkeleton from "../../components/skeleton/CartSkeleton";
import PaymentBox from "./PaymentBox";

const Checkout = () => {
  const [error, setError] = useState("");

  const { cart, loading: cartLoading } = useCart();
  const { loading: addressLoading } = useAddress();

  const restaurant = cart?.restaurant;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
      <div className="lg:col-span-2 flex flex-col gap-3">
        <div className="p-6 rounded-xl border border-gray-300 bg-white">
          <Skeleton loading={addressLoading}>
            <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
              Delivery Address
            </h2>
          </Skeleton>
          <AddressBox />
        </div>

        {/* Order Summary */}
        <div className="p-6 rounded-xl border border-gray-300 bg-white">
          {error && (
            <Skeleton loading={cartLoading}>
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-100">
                <h3 className="text-sm text-red-600 font-bold mb-1">{error}</h3>
                <p className="text-xs text-gray-500">
                  Some items in your order are currently unavailable. We've
                  updated your cart totals — please review before checking out.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Remove unavailable items to proceed.
                </p>
              </div>
            </Skeleton>
          )}

          {restaurant && (
            <>
              <Skeleton loading={cartLoading}>
                <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                  Ordering From
                </h2>
              </Skeleton>

              {cartLoading ? (
                <Skeleton loading={true} className="h-20 w-full rounded-xl" />
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-orange-100 mb-5">
                  <Link to={`/restaurant/${restaurant?.slug}`}>
                    <div className="w-14 h-14 min-w-14 rounded-xl border border-orange-200 bg-white overflow-hidden flex items-center justify-center text-2xl">
                      {restaurant?.logo ? (
                        <img
                          src={restaurant.logo}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "🏪"
                      )}
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        to={`/restaurant/${restaurant?.slug}`}
                        className="font-bold text-gray-800 hover:text-[#fc8019] transition-colors text-[15px]"
                      >
                        {restaurant?.name}
                      </Link>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          restaurant?.isOpen
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {restaurant?.isOpen ? "● Open" : "● Closed"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {restaurant?.cuisine.map((c) => c).join(" · ")}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <LocationIcon size={16} />
                        {restaurant?.address.addressLine1},{" "}
                        {restaurant?.address.city}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <TimeIcon /> {restaurant?.deliveryTime} min
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <StarIcon /> {restaurant?.rating}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 text-[#fc8019] font-medium">
                        ${restaurant?.deliveryFee} delivery
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/restaurant/${restaurant?.slug}`}
                    className="shrink-0 text-xs font-semibold text-[#fc8019] border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-white transition-colors hidden sm:block"
                  >
                    View Menu →
                  </Link>
                </div>
              )}
            </>
          )}

          <Skeleton loading={cartLoading}>
            <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
              Order Summary
              {cart?.items?.length > 0 && (
                <span className="ml-auto text-xs font-medium text-gray-400">
                  {cart.items.length} item{cart.items.length > 1 ? "s" : ""}
                </span>
              )}
            </h2>
          </Skeleton>

          {cartLoading ? (
            <CartSkeleton />
          ) : (
            <div className="divide-y divide-gray-50">
              {cart?.items?.map((currProd) => (
                <div
                  key={currProd._id}
                  className={`flex items-center gap-4 py-4 ${
                    !currProd.dish.isAvailable ? "opacity-50" : ""
                  }`}
                >
                  <div className="w-16 h-16 min-w-16 rounded-xl border border-orange-100 overflow-hidden bg-orange-50 flex items-center justify-center">
                    <img
                      src={assets.dish2}
                      alt={currProd.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-700 text-sm leading-snug line-clamp-1">
                      {currProd.name}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {currProd.variant?.name}
                      {currProd.addOns?.length > 0 &&
                        ` · ${currProd.addOns.map((a) => a.name).join(", ")}`}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      ${currProd.price.toFixed(2)} × {currProd.quantity}
                    </p>
                    {!currProd.dish.isAvailable && (
                      <span className="text-[11px] text-red-400 font-semibold mt-0.5 inline-block">
                        Unavailable
                      </span>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-[15px] font-bold text-[#fc8019]">
                      ${(currProd.price * currProd.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="self-start sticky top-0">
        <PaymentBox setError={setError} />
      </div>
    </div>
  );
};

export default Checkout;
