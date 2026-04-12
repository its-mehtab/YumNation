import mongoose, { Schema } from "mongoose";
import slugGenerator from "../utils/slugGenerator.js";

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    slug: { type: String, unique: true },

    description: { type: String, required: true },

    cuisine: [{ type: String }],

    costForTwo: { type: Number, default: 0 },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please use a valid 10-digit phone number"],
    },

    logo: { type: String },

    coverImage: { type: String },

    address: {
      type: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true },
        coordinates: {
          type: {
            type: String,
            enum: ["Point"],
            default: "Point",
          },
          coordinates: {
            type: [Number], // [lng, lat]
            index: "2dsphere",
          },
        },
      },
      required: true,
    },

    openingHours: {
      open: { type: String, default: "09:00" },
      close: { type: String, default: "22:00" },
    },

    isOpen: { type: Boolean, default: true },

    isActive: { type: Boolean, default: true },

    isPureVeg: { type: Boolean, default: false },

    deliveryTime: { type: Number, default: 30 },

    minOrderAmount: { type: Number, default: 0 },

    deliveryFee: { type: Number, default: 2.5 },

    rating: { type: Number, default: 0 },

    totalReviews: { type: Number, default: 0 },

    totalOrders: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["pending", "active", "rejected", "suspended"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

restaurantSchema.pre("save", slugGenerator);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
