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

export const addWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId, name, image, price } = req.body;

  try {
    const userWishlist = await Wishlist.findOne({ user: userId });

    if (userWishlist) {
      const wishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        {
          $pull: {
            items: {
              product: productId,
            },
          },
        },
        { new: true }
      ).populate("items.product", "name slug");

      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
    } else {
      userWishlist = await Wishlist.create({
        user: userId,
        items: [
          { product: productId, name, image, price, quantity, variant, addOns },
        ],
      });
    }

    const updatedWishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product"
    );

    return res.status(201).json(updatedWishlist.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
