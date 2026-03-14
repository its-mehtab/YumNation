import mongoose, { Schema } from "mongoose";
import slugGenerator from "../utils/slugGenerator.js";

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    cost: { type: Number, default: 0, min: 0 },

    shortDescription: {
      type: String,
      required: true,
    },

    longDescription: {
      type: String,
      required: true,
    },

    image: { type: String, default: null },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    foodType: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      required: true,
      default: "veg",
    },

    variants: [
      {
        name: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: false,
          min: 0,
        },
        stock: {
          type: Number,
          default: null,
        },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        totalOrders: { type: Number, default: 0 },
      },
    ],

    addOns: [
      {
        name: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: false,
          min: 0,
        },
      },
    ],

    stock: { type: Number, default: null },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

dishSchema.pre("save", slugGenerator);

dishSchema.index({
  name: "text",
  shortDescription: "text",
  longDescription: "text",
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
