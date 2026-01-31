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
  const { productId } = req.body;
  console.log(productId);

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const index = wishlist.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        wishlist.items.splice(index, 1);
      } else {
        wishlist.items.push({ product: productId });
      }

      await wishlist.save();
    }

    const updatedWishlist = await wishlist.populate(
      "items.product",
      "name slug"
    );

    return res.status(201).json(updatedWishlist.items);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
