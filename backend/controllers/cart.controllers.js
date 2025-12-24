import Cart from "../models/cart.modal.js";

export const getCart = async (req, res) => {
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

// export const updateQuantity = async()=>{
//     cost
// }
