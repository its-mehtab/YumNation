import bcrypt from "bcrypt";
import User from "../models/user.modal.js";
import generateToken from "../config/token.js";
import { sendOtpMail } from "../utils/mail.js";
import crypto from "crypto";

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
      secure: process.env.NODE_ENVIREMENT === "production",
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ firstName, lastName, email, role });
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
      secure: process.env.NODE_ENVIREMENT === "production",
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
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

    res.status(200).json({
      message: "Logout Succesfull",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user does not exists" });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    res.status(200).json({ message: "Otp Sent!" });
  } catch (error) {
    res.status(500).json({ message: `Send otp error: ${error}` });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user does not exists" });
    }

    if (user.resetOtp !== otp) {
      res.status(400).json({ message: "Wrong Otp" });
    }
    console.log(resetOtpExpires);

    // if(user.resetOtpExpires)
  } catch (error) {
    res.status(500).json({ message: `Verify otp error: ${error}` });
  }
};
