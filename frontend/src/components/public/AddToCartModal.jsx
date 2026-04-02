import React, { useState } from "react";
import { useCart } from "../../context/user/CartContext";
import DialogBox from "../dialog-box/DialogBox";
import { Dialog } from "@radix-ui/themes";
import { useAuth } from "../../context/user/AuthContext";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/toast";

const AddToCartModal = ({ dish, restaurant, children }) => {
  const [isDishOpen, setIsDishOpen] = useState(false);

  const { setCart } = useCart();
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

  const handleAddCart = async () => {
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
    <DialogBox
      isModalOpen={isDishOpen}
      size={"550px"}
      btn={<div onClick={() => setIsDishOpen(true)}>{children}</div>}
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

        {dish?.addOns?.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] font-semibold text-gray-800">Add Ons</p>
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
  );
};

export default AddToCartModal;
