import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  code: { type: String, required: true },
  discountType: { type: String, enum: ["flat", "percentage"], required: true },
  value: { type: Number, required: true },
  minOrderAmount: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
