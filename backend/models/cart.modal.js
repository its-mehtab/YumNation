import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        variant: {
          type: String,
        },

        addOns: [
          {
            name: String,
            price: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
