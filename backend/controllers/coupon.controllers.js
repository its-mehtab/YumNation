import mongoose from "mongoose";
import Coupon from "../models/coupon.modal.js";
import { validateCoupon } from "../services/coupon.service.js";

export const getCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find();

    return res.status(200).json(coupon);
  } catch (error) {
    console.error("verifyCoupon error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyCoupon = async (req, res) => {
  const userId = req.userId;
  const { code } = req.params;

  try {
    const { coupon } = await validateCoupon(userId, code);

    return res.status(200).json({
      code: coupon.code,
      discountType: coupon.discountType,
      maxDiscount: coupon.maxDiscount,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
    });
  } catch (error) {
    console.error("verifyCoupon error:", error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createCoupon = async (req, res) => {
  const {
    code,
    title,
    subTitle,
    discountType,
    value,
    minOrderAmount,
    maxUses,
    maxDiscount,
    maxUsesPerUser,
    expiresAt,
    termsAndConditions,
  } = req.body;

  if (
    !code ||
    !title ||
    !subTitle ||
    !discountType ||
    !value ||
    !minOrderAmount ||
    !maxUses ||
    !maxUsesPerUser ||
    !expiresAt ||
    !termsAndConditions
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
  if (discountType === "percentage" && !maxDiscount) {
    return res.status(400).json({ message: "maxDiscount is required" });
  }

  try {
    const codeExists = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (codeExists) {
      return res.status(400).json({ message: "Code already exists" });
    }

    const coupon = await Coupon.create({
      ...req.body,
      code: code.trim().toUpperCase(),
    });

    return res.status(201).json(coupon);
  } catch (error) {
    console.error("Craetew Coupon error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    const coupon = await Coupon.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    console.error("Update Coupon error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Coupon ID" });
    }

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json({
      message: "Coupon deleted successfully",
      coupon,
    });
  } catch (error) {
    console.error("Delete Coupon error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
