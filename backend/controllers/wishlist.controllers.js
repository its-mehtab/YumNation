import Wishlist from "../models/wishlist.modal.js";

export const getUserWishlist = async (req, res) => {
  const userId = req.userId;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
      "name slug"
    );

    if (!wishlist) {
      return res.status(200).json([]);
    }

    return res.status(200).json(wishlist.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId, name, image, price } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      const index = wishlist.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        wishlist.items.splice(index, 1);
      } else {
        wishlist.items.push({ product: productId, name, image, price });
      }

      await wishlist.save();
    } else {
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ product: productId, name, image, price }],
      });
    }

    const updatedWishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
      "name slug"
    );

    return res.status(201).json(updatedWishlist.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const index = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    wishlist.items.splice(index, 1);
    await wishlist.save();

    const updatedWishlist = await wishlist.populate(
      "items.product",
      "name slug"
    );

    return res.status(200).json(updatedWishlist.items);
  } catch (error) {
    return res.status(500).json({
      message: "Remove from Wishlist error",
      error: error.message,
    });
  }
};
