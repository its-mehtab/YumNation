import Cart from "../models/cart.modal.js";
import Product from "../models/product.modal.js";
import { generateCartKey } from "../utils/cartKey.js";

export const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name slug stock isAvailable variants")
      .lean();

    if (!cart) {
      return res.status(200).json([]);
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const addCart = async (req, res) => {
  const userId = req.userId;

  const { product, quantity = 1, variant, addOns } = req.body;

  try {
    const productDoc = await Product.findById(product);

    if (!productDoc || !productDoc.isAvailable || productDoc.stock <= 0) {
      return res.status(400).json({ message: "Product unavailable" });
    }

    const price = productDoc.price;
    const name = productDoc.name;
    const image = productDoc.images[0];

    let cart = await Cart.findOne({ user: userId });

    const cartKey = generateCartKey(product, variant, addOns);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.cartKey === cartKey,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product,
          name,
          cartKey,
          image,
          price,
          quantity,
          variant,
          addOns,
        });
      }
      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        items: [
          { product, name, image, cartKey, price, quantity, variant, addOns },
        ],
      });
    }

    await cart.populate(
      "items.product",
      "name slug stock isAvailable variants",
    );

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name slug stock isAvailable variants",
    );

    return res.status(201).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { action, productId, variant, addOns } = req.body;
  const userId = req.userId;

  const cartKey = generateCartKey(productId, variant, addOns);

  if (!productId || !variant || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.cartKey === cartKey);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "decrease") {
      if (item.quantity <= 1) {
        cart.items = cart.items.filter((i) => i.cartKey !== cartKey);
      } else {
        item.quantity -= 1;
      }
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    await cart.save();

    const updatedCart = await cart.populate(
      "items.product",
      "name slug stock isAvailable variants",
    );

    return res.status(200).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;

  const { productId, variant, addOns } = req.body;
  console.log(productId);

  const cartKey = generateCartKey(productId, variant, addOns);

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            product: productId,
            cartKey,
          },
        },
      },
      { new: true },
    ).populate("items.product", "name slug stock isAvailable variants");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({
      message: "Remove from cart error",
      error: error.message,
    });
  }
};
