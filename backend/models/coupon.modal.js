import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["flat", "percentage"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      min: 0,
    },
    maxUses: {
      type: Number,
      required: true,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    maxUsesPerUser: {
      type: Number,
      required: true,
      min: 1,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    termsAndConditions: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

couponSchema.pre("save", function (next) {
  if (this.discountType === "percentage" && !this.maxDiscount) {
    return next(new Error("Max discount required for percentage coupons"));
  }
  next();
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
