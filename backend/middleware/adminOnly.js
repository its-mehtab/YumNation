import User from "../models/user.modal.js";

export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ user: req.user });
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
