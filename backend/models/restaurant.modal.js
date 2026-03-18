import mongoose, { Schema } from "mongoose";
import slugGenerator from "../utils/slugGenerator.js";

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    slug: { type: String, unique: true },

    description: { type: String, required: true },

    cuisine: [{ type: String }],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: { type: String, required: true },

    phone: { type: String, required: true },

    logo: { type: String },

    coverImage: { type: String },

    address: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
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
