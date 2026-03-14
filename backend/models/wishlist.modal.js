import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Wishlist = mongoose.model("wishlist", wishlistSchema);

export default Wishlist;
