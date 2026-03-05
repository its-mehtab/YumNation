import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Button as RxButton } from "@radix-ui/themes";
import Button from "../../components/button/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Cross2Icon } from "@radix-ui/react-icons";

const PaymentBox = ({ setError }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState({
    couponCode: "",
    couponApplied: "",
    invalidCouponMsg: "",
    discountType: null,
    value: 0,
    discount: 0,
  });

  const { serverURL } = useAuth();
  const {
    cart,
    setCart,
    subtotal,
    loading: cartLoading,
    fetchUserCart,
  } = useCart();

  const deliveryFee = 2.5;

  const discount =
    coupon.discountType === "flat"
      ? coupon.value
      : coupon.discountType === "percentage"
        ? (coupon.value * subtotal) / 100
        : 0;

  const total = subtotal + deliveryFee - discount;
  const tax = (total * 5) / 100;

  const handleCouponApply = async (e) => {
    e.preventDefault();
    const normalizedCode = coupon.couponCode.trim().toUpperCase();

    if (!normalizedCode) return;

    try {
      const { data } = await axios.get(
        `${serverURL}/api/coupon/${normalizedCode}`,
        {
          withCredentials: true,
        },
      );

      setCoupon({
        discountType: data.discountType,
        value: data.value,
        couponCode: "",
        invalidCouponMsg: "",
        couponApplied: normalizedCode,
      });
    } catch (error) {
      console.log("Checkout Error:", error?.response?.data || error.message);
      if (error.status === 403) return;
      setCoupon({
        couponCode: "",
        invalidCouponMsg: error?.response?.data.message,
        couponApplied: "",
      });
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${serverURL}/api/checkout`, {
        withCredentials: true,
      });

      console.log(data);

      // await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Order placed successfully 🎉");
    } catch (error) {
      console.log(
        "Checkout Verify Error:",
        error?.response?.data || error.message,
      );

      setError(error?.response?.data.message);
      fetchUserCart();

      error?.response?.data?.cart && setCart(error?.response?.data?.cart);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-300 sticky top-0">
      <div className="text-gray-500 text-sm font-medium mb-2">Promo Code</div>
      <form className="w-full flex gap-2" onSubmit={handleCouponApply}>
        <input
          value={coupon?.couponCode}
          onChange={(e) =>
            setCoupon((prev) => {
              return { ...prev, couponCode: e.target.value };
            })
          }
          type="text"
          placeholder="Apply promo code"
          className="w-full border border-gray-300 outline-gray-300 rounded-md px-4 py-1.5 text-sm min-w-40 mb-2"
        />
        <RxButton type="submit">Apply</RxButton>
      </form>
      {coupon?.couponApplied && (
        <>
          <h3 className="text-[#fc8019] text-xs capitalize font-semibold mb-2">
            Coupon applied!
          </h3>
          <div className="px-3 py-1.5 rounded-md bg-[#fc8019] text-white inline-flex gap-1 items-center ">
            <div
              className="cursor-pointer"
              onClick={() =>
                setCoupon({
                  couponCode: "",
                  couponApplied: "",
                  invalidCouponMsg: "",
                  discountType: null,
                  value: 0,
                })
              }
            >
              <Cross2Icon />
            </div>
            {coupon.couponApplied}
          </div>
        </>
      )}

      {coupon.invalidCouponMsg && (
        <div className="text-red-600">{coupon.invalidCouponMsg}</div>
      )}

      <div className="mt-3">
        <h3 className="font-medium mb-3 text-sm text-gray-600">
          Payment Method
        </h3>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit / Debit Card
          </label>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-6 border-t border-gray-300 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {coupon.couponApplied && (
          <div className="flex justify-between mt-2">
            <span>Coupon ({coupon.couponApplied})</span>
            <span>${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-4 font-semibold text-[#fc8019] text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order */}
      <Button addClass="mt-6 w-full text-center" onClick={handlePlaceOrder}>
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
};

export default PaymentBox;
