import Cart from "../models/cart.modal.js";

export const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(400)
        .json({ message: "cart for this user is unavailable" });
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

  if (
    !product ||
    !name ||
    !image ||
    !price ||
    !quantity ||
    !variant ||
    !addOns
  ) {
    return res.status(200).json({ message: "send all details" });
  }

  try {
    const cart = await Cart.create({
      user: userId,
      items: [
        {
          product,
          name,
          image,
          price,
          quantity,
          variant,
          addOns,
        },
      ],
    });

    return res.status(201).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { quantity, productId } = req.body;
  const userId = req.userId;

  if (!quantity) {
    return res.status(400).json({ message: "quantity is required" });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          items: {
            product: productId,
            quantity,
          },
        },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart``);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "quantity update error", error: error.message });
  }
};
