import Cart from "../models/cart.modal.js";

export const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name slug"
    );

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

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    return res.status(201).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { action, productId, variant } = req.body;
  const userId = req.userId;

  if (!productId || !variant || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log(productId, variant, action);

    // console.log(cart);

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.variant === variant
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "decrease") {
      item.quantity = Math.max(1, item.quantity - 1);
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    await cart.save(); // 🔥 THIS WAS MISSING

    const updatedCart = await cart.populate("items.product");

    return res.status(200).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId, variant } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            product: productId,
            variant: variant,
          },
        },
      },
      { new: true }
    ).populate("items.product", "name slug");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Remove from cart error",
      error: error.message,
    });
  }
};
