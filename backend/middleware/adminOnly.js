import User from "../models/user.modal.js";

export const adminOnly = async (req, res, next) => {
  console.log({ _id: req.userId });

  try {
    const user = await User.findOne({ _id: req.userId });
    console.log(user);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
