import mongoose, { Schema } from "mongoose";
import slugGenerator from "../utils/slugGenerator.js";

const productSchema = new Schema(
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

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

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
      },
    ],

    addOns: [
      {
        addOnId: { type: mongoose.Schema.Types.ObjectId },
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

    ingredients: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 999,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

productSchema.pre("save", slugGenerator);

const Product = mongoose.model("Product", productSchema);

export default Product;

productSchema.index({
  name: "text",
  description: "text",
  ingredients: "text",
});
