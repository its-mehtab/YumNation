import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
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

        cartKey: {
          type: String,
          required: true,
        },

        image: {
          type: String,
        },

        basePrice: { type: Number, required: true },

        price: {
          type: Number,
          required: true,
        },

        // itemTotal: { type: Number, required: true },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        variant: {
          name: { type: String },
          price: { type: Number },
        },

        addOns: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
