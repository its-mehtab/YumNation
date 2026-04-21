import bcrypt from "bcrypt";
import User from "../models/user.modal.js";
import generateToken from "../config/token.js";
import { sendOtpMail } from "../utils/mail.js";
import crypto from "crypto";
import Order from "../models/order.modal.js";
import Address from "../models/address.modal.js";
import { getPaginatedOrders } from "../services/order.service.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !email || !password || !role) {
      return res.status(400).json({ message: "Send all details" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dishion",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ firstName, lastName, email, role });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dishion",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout Succesfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select(
      "createdAt email firstName lastName role",
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { search, sort, status, page = 1, limit = 12 } = req.query;

  try {
    // const query = {};

    // if (status) query.status = status;

    // if (search) {
    //   const regex = new RegExp(search, "i");
    //   query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    // }

    // const sortMap = {
    //   latest_asc: { createdAt: -1 },
    //   highest_spent: { totalSpent: -1 },
    //   most_orders: { totalOrders: -1 },
    //   recent_order: { lastOrderAt: -1 },
    // };
    // const sortOption = sortMap[sort] || { createdAt: -1 };

    // const pageNum = Math.max(Number(page) || 1, 1);
    // const limitNum = Math.min(Number(limit) || 12, 40);
    // const skip = (pageNum - 1) * limitNum;
    // ===========

    const [user, orders, addresses, couponsUsed] = await Promise.all([
      User.findById(userId).select("-password -__v").lean(),

      await getPaginatedOrders({
        filter: { user: userId },
        page: page,
        limit: limit,
        populate: "items.dish",
      }),

      Address.find({ user: userId }).select("-addressKey -user -__v").sort({
        isDefault: -1,
        createdAt: -1,
      }),

      await Order.distinct("couponCode", {
        user: userId,
        couponCode: { $ne: null },
      }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({
      ...user,
      orders,
      addresses,
      couponsUsed,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const { search, sort, status, page = 1, limit = 12 } = req.query;

  try {
    const query = { role: "user" };

    if (status) query.status = status;

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const sortMap = {
      latest_asc: { createdAt: -1 },
      highest_spent: { totalSpent: -1 },
      most_orders: { totalOrders: -1 },
      recent_order: { lastOrderAt: -1 },
    };
    const sortOption = sortMap[sort] || { createdAt: -1 };

    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.min(Number(limit) || 12, 40);
    const skip = (pageNum - 1) * limitNum;

    const [
      users,
      total,
      totalCustomer,
      totalActive,
      totalBlocked,
      totalOrders,
    ] = await Promise.all([
      User.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .select("-password -__v")
        .lean(),
      User.countDocuments(query),
      User.countDocuments({ role: "user" }),
      User.countDocuments({ status: "active", role: "user" }),
      User.countDocuments({ status: "blocked", role: "user" }),
      Order.countDocuments(),
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      items: users,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      totalCustomer,
      totalActive,
      totalBlocked,
      totalOrders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.userId;

    const allowedUpdates = ["name", "email", "avatar", "status"];
    const updates = {};

    for (let key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "Otp Sent!" });
  } catch (error) {
    return res.status(500).json({ message: `Send otp error: ${error}` });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    if (user.resetOtpExpires <= Date.now()) {
      return res.status(400).json({ message: "Otp Expired" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Wrong Otp" });
    }

    user.resetOtp = null;
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({ message: "Otp verified successfull" });
  } catch (error) {
    return res.status(500).json({ message: `Verify otp error: ${error}` });
  }
};

export const resetNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    if (user.resetOtpExpires <= Date.now() || !user.isOtpVerified) {
      return res
        .status(400)
        .json({ message: "Session expired reverify email" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    user.resetOtpExpires = null;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successfull" });
  } catch (error) {
    return res.status(500).json({ message: `Password reset error: ${error}` });
  }
};
