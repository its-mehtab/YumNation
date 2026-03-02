import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  code: String,
  discountType: { type: String, enum: ["flat", "percentage"] },
  value: Number,
  minOrderAmount: Number,
  expiresAt: Date,
  isActive: Boolean,
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
