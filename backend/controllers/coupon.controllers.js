import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";

export const getCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find();

    return res.status(200).json(coupon);
  } catch (error) {
    console.error("verifyCoupon error:", error); // 👈 add this
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyCoupon = async (req, res) => {
  const userId = req.userId;
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOne({ code: code.trim().toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid Coupon" });
    }
    if (!coupon.isActive) {
      return res.status(400).json({ message: "Coupon is not active" });
    }
    if (coupon.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Coupon Expired" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartTotal = cart.items.reduce((acc, item) => {
      return item.price * item.quantity + acc;
    }, 0);

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum cart of $${coupon.minOrderAmount} is required for this Coupon`,
      });
    }

    return res.status(200).json({
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
    });
  } catch (error) {
    console.error("verifyCoupon error:", error); // 👈 add this
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createCoupon = async (req, res) => {
  const { code, discountType, value, minOrderAmount, expiresAt } = req.body;

  if (
    !code ||
    !discountType ||
    value == null ||
    !minOrderAmount ||
    !expiresAt
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["flat", "percentage"].includes(discountType)) {
    return res.status(400).json({ message: "Invalid discount type" });
  }

  if (discountType === "percentage" && (value <= 0 || value > 100)) {
    return res
      .status(400)
      .json({ message: "Percentage must be between 1 and 100" });
  }

  try {
    const codeExists = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (codeExists) {
      return res.status(400).json({ message: "Code already exists" });
    }

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      discountType,
      value,
      minOrderAmount,
      expiresAt,
    });

    return res.status(201).json(coupon);
  } catch (error) {
    console.error("verifyCoupon error:", error); // 👈 add this
    return res.status(500).json({ message: "Internal server error" });
  }
};
