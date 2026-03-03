import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";

export const getCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find();

    return res.status(200).json(coupon);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const verifyCoupon = async (req, res) => {
  const userId = req.userId;
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOne({ code });

    const cart = await Cart.findOne({ user: userId });
    const cartTotal = cart.items.reduce((acc, item) => {
      return item.price * item.quantity + acc;
    }, 0);

    if (!coupon) {
      return res.status(404).json({ message: "Invalid Coupon" });
    }
    if (!coupon.isActive) {
      return res.status(404).json({ message: "Coupon is not active" });
    }
    if (coupon.expiresAt < Date.now()) {
      return res.status(404).json({ message: "Coupon Expired" });
    }
    if (cartTotal < coupon.minOrderAmount) {
      return res
        .status(404)
        .json({
          message: `Minimum cart of $${coupon.minOrderAmount} is required for this Coupon`,
        });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const createCoupon = async (req, res) => {
  const { code, discountType, value, minOrderAmount, expiresAt } = req.body;

  try {
    const codeExists = await Coupon.findOne({ code });

    if (codeExists) {
      return res.status(400).json({ message: "Code already exists" });
    }

    const coupon = await Coupon.create({
      code,
      discountType,
      value,
      minOrderAmount,
      expiresAt,
    });

    return res.status(201).json(coupon);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
