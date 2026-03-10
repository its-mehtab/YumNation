import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";

export const validateCoupon = async (userId, code) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartTotal = cart.items.reduce((acc, item) => {
    return item.price * item.quantity + acc;
  }, 0);

  if (!code) {
    return { coupon: null, cart, cartTotal };
  }

  const coupon = await Coupon.findOne({
    code: code.trim().toUpperCase(),
  }).lean();

  if (!coupon) {
    throw new Error("Invalid Coupon");
  }
  if (!coupon.isActive) {
    throw new Error("Coupon is not active");
  }
  if (coupon.expiresAt < Date.now()) {
    throw new Error("Coupon Expired");
  }

  if (cartTotal < coupon.minOrderAmount) {
    throw new Error(
      `Minimum cart of $${coupon.minOrderAmount} is required for this Coupon`,
    );
  }

  return { coupon, cart, cartTotal };
};
