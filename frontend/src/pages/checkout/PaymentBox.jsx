import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Button as RxButton } from "@radix-ui/themes";
import Button from "../../components/button/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const PaymentBox = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState({
    couponCode: "",
    couponApplied: "",
    invalidCouponMsg: "",
  });

  const { serverURL } = useAuth();
  const { cart, subtotal, loading: cartLoading } = useCart();

  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;

  const handleCouponApply = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${serverURL}/api/coupon/${coupon.couponCode}`,
        { withCredentials: true },
      );

      setCoupon({
        couponCode: "",
        invalidCouponMsg: "",
        couponApplied: data.code,
      });
    } catch (error) {
      console.log("Checkout Error:", error?.response?.data || error.message);

      if (error.status === 404) {
        setCoupon((prev) => {
          return { ...prev, invalidCouponMsg: error?.response?.data.message };
        });
      }
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      // simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Order placed successfully 🎉");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-300 sticky top-0">
      <div className="text-gray-500 text-sm font-medium mb-2">Promo Code</div>
      {coupon?.couponApplied ? (
        <div>{coupon.couponApplied}</div>
      ) : (
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
          <RxButton onClick={handleCouponApply}>Apply</RxButton>
        </form>
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

        <div className="flex justify-between mt-2">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
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
