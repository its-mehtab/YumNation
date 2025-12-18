import { json } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server issue" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
