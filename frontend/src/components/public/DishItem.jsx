import React, { useEffect, useState } from "react";
import VegBadge from "../../components/public/VegBadge";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import DialogBox from "../dialog-box/DialogBox";
import { Dialog } from "@radix-ui/themes";
import { notifyError, notifySuccess } from "../../utils/toast";

const DishItem = ({ dish, restaurant }) => {
  const [isDescTrimmed, setIsDescTrimmed] = useState(true);
  const [isDishOpen, setIsDishOpen] = useState(false);

  const { cart, setCart } = useCart();
  const { serverURL } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState(
    dish?.variants[0]?.name,
  );
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variantPrice = dish?.variants?.find(
    (v) => v.name === selectedVariant,
  )?.price;

  const addOnsTotal = selectedAddOns.reduce(
    (sum, key) => sum + dish.addOns.find((a) => a.name === key).price,
    0,
  );

  const itemTotal = ((variantPrice + addOnsTotal) * quantity).toFixed(2);

  const toggleAddOn = (key) => {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  // const { isUnavailable, statusText } = fetchAvailibility(currDish);

  const handleAddCart = async () => {
    // if (isUnavailable) {
    //   notifyError(`${currDish.name} is ${statusText}`);
    //   return;
    // }

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          dish: dish._id,
          restaurant: restaurant._id,
          name: dish.name,
          quantity,
          variant: selectedVariant,
          addOns: selectedAddOns,
        },
        { withCredentials: true },
      );

      setCart(data);

      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
      notifySuccess(`${dish.name} added to cart`);
      setIsDishOpen(false);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError(error?.response?.data.message);
    }
  };

  return (
    <div className="flex justify-between items-start py-5 border-b border-gray-100 gap-4 last:border-b-0">
      {/* Left */}
      <div className="flex-1 min-w-0">
        <VegBadge isNonVeg={dish.foodType === "non-veg"} />
        <h3 className="text-[15px] font-semibold text-gray-900 mt-1.5 mb-1 leading-snug">
          {dish.name}
        </h3>
        <p className="text-[15px] font-bold text-gray-900 mb-1.5">
          ${dish.price}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="text-amber-400">★</span>
          <span>
            {dish.rating} ({dish.totalReviews})
          </span>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {isDescTrimmed && dish.shortDescription.length > 30 ? (
            <>
              {dish.shortDescription.slice(0, 30)}
              {"..."}
              <span
                onClick={() => setIsDescTrimmed(false)}
                className="text-orange-500 cursor-pointer font-medium hover:underline"
              >
                more
              </span>
            </>
          ) : (
            dish.shortDescription
          )}
        </p>
      </div>

      <div className="relative shrink-0 pb-4">
        <img
          src={
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80"
          }
          // src={dish.image}
          alt={dish.name}
          className="w-29.5 h-25 object-cover rounded-xl"
        />
        {(dish.variants.length > 0 || dish.addOns > 0) && (
          <DialogBox
            isModalOpen={isDishOpen}
            size={"550px"}
            dialogBtnName="ADD"
            btn={
              <button
                onClick={() => setIsDishOpen(true)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-5 py-1.5 text-[13px] font-bold text-orange-600 shadow-sm whitespace-nowrap hover:bg-orange-50 transition-colors"
              >
                ADD
              </button>
            }
          >
            <Dialog.Description size="2" color="gray" mb="4">
              {dish?.name} • ${dish?.variants[0]?.price} - $
              {dish?.variants[dish.variants.length - 1]?.price}
            </Dialog.Description>
            <Dialog.Title color="gray">
              <span className="font-[Poppins] text-lg font-bold text-gray-700">
                Customise as per your taste
              </span>
            </Dialog.Title>
            <div className="overflow-y-auto max-h-85 flex flex-col gap-5">
              {/* Variants */}
              {dish.variants.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[13px] font-semibold text-gray-800">
                      Choose Size
                    </p>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      Required · 1
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {dish.variants.map((v) => {
                      return (
                        <button
                          key={v._id}
                          onClick={() => {
                            setSelectedVariant(v.name);
                          }}
                          className={`flex items-center justify-between px-3 py-3 rounded-xl border text-left transition-all ${selectedVariant === v.name ? "border-orange-500 bg-orange-500/4" : "border-gray-200"}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-[1.5px] ${selectedVariant === v.name ? "border-orange-500" : "border-gray-300"}`}
                            >
                              {selectedVariant === v.name && (
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-gray-800 font-medium">
                                {v.name}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            ${v.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {dish.addOns.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[13px] font-semibold text-gray-800">
                      Add Ons
                    </p>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      Optional
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {dish.addOns.map((d) => {
                      return (
                        <button
                          key={d._id}
                          onClick={() => toggleAddOn(d.name)}
                          className={`flex items-center justify-between px-3 py-3 rounded-xl border text-left transition-all ${selectedAddOns.includes(d.name) ? "border-orange-500 bg-orange-500/4" : "border-gray-200"}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border-[1.5px] transition-all ${selectedAddOns.includes(d.name) ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-transparent"}`}
                            >
                              {selectedAddOns.includes(d.name) && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <polyline
                                    points="1.5,5 4,7.5 8.5,2.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-800">
                              {d.name}
                            </p>
                          </div>
                          <span
                            className={`text-sm  ${selectedAddOns.includes(d.name) ? "text-gray-800" : "text-gray-500"}`}
                          >
                            + ${d.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="py-3 border-t border-gray-100 flex items-center gap-3 bg-white">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-lg transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-[14px] font-medium text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-lg transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddCart}
                className={`flex-1 h-10 rounded-xl text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${added ? "bg-orange-700" : "bg-orange-500 hover:bg-orange-600"}`}
              >
                {added ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline
                        points="1,7 5,11 13,3"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <span>Add to cart</span>
                    <span className="opacity-60">·</span>
                    <span>${itemTotal}</span>
                  </>
                )}
              </button>
            </div>
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default DishItem;
