import User from "../models/user.modal.js";

export const restaurantOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user.role !== "restaurant") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
