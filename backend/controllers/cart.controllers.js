import Cart from "../models/cart.modal.js";

export const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

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
  const { product, name, image, price, quantity, variant, addOns } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === product && item.variant === variant
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product,
          name,
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
        items: [{ product, name, image, price, quantity, variant, addOns }],
      });
    }

    return res.status(201).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { quantity, productId, variant } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId, "items.product": productId, "items.variant": variant },
      { $set: { "items.$.quantity": quantity } }, // The '$' targets the matched item
      { new: true }
    );

    if (!cart)
      return res.status(404).json({ message: "Item not found in cart" });
    return res.status(200).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const id = req;
  console.log(req.params);

  try {
    const cartToDelete = await Cart.findOne({
      user: userId,
      "items.product": id,
    });

    // console.log(cartToDelete);

    // return res.status(200).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Delete cart error", error: error.message });
  }
};
