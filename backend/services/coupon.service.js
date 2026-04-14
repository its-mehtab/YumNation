import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";
import Order from "../models/order.modal.js";

export const validateCoupon = async (userId, code) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "restaurant",
    "name logo slug cuisine address isOpen rating deliveryFee deliveryTime",
  );

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
  if (coupon.status === "inactive") {
    throw new Error("Coupon is not active");
  }
  if (coupon.expiresAt < Date.now()) {
    throw new Error("Coupon Expired");
  }
  if (
    coupon.discountType === "percentage" &&
    cartTotal < coupon.minOrderAmount
  ) {
    throw new Error(
      `Minimum cart of $${coupon.minOrderAmount} is required for this Coupon`,
    );
  }

  const userCouponUsed = await Order.countDocuments({
    user: userId,
    couponCode: code,
  });

  if (userCouponUsed >= coupon.maxUsesPerUser) {
    throw new Error("You've already used this promo code");
  }

  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    throw new Error("Promo code fully redeemed");
  }

  return { coupon, cart, cartTotal };
};
