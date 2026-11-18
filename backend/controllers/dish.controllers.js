import Dish from "../models/dish.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import Category from "../models/category.modal.js";
import User from "../models/user.modal.js";
import mongoose from "mongoose";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinaryService.js";
import { parseArrayField } from "../services/arrayService.js";

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ restaurant: req.restaurantId })
      .populate("category", "name slug")
      .select(req.hideFields || "");

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
};

export const getDishBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const dish = await Dish.findOne({ slug }).populate("category", "name");

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({
      message: "unable to find dish by slug",
      error: error.message,
    });
  }
};

export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)
      .populate("category", "name slug")
      .populate("restaurant");

    if (!dish) return res.status(404).json({ message: "Dish not found" });

    const user = await User.findById(req.userId).select("role");

    if (
      user.role !== "admin" &&
      dish.restaurant._id.toString() !== req.restaurantId.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({
      message: "unable to find dish by id",
      error: error.message,
    });
  }
};

export const createDish = async (req, res) => {
  console.log(JSON.parse(req.body.data));

  const dishData = JSON.parse(req.body.data);

  const owner = req.userId;

  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const session = await mongoose.startSession();

  let imagePublicId = null;
  try {
    let populatedDish;

    const uploadedImage = await uploadToCloudinary(req.file.buffer);
    imagePublicId = uploadedImage.publicId;

    await session.withTransaction(async () => {
      const restaurant = await Restaurant.findOne({ owner }).session(session);

      if (!restaurant) {
        throw new Error("RESTAURANT_NOT_FOUND");
      }

      if (restaurant.status !== "active") {
        throw new Error("RESTAURANT_NOT_ACTIVE");
      }

      const categoryExists = await Category.findById(req.body.category).session(
        session,
      );

      if (!categoryExists) {
        throw new Error("INVALID_CATEGORY");
      }

      const [dish] = await Dish.create(
        [
          {
            ...dishData,
            image: uploadedImage?.imageUrl,
            imagePublicId: uploadedImage?.publicId,
            restaurant: restaurant._id,
          },
        ],
        { session },
      );

      await Restaurant.updateOne(
        { _id: restaurant._id },
        { $inc: { totalDishes: 1 } },
        { session },
      );

      populatedDish = await Dish.findById(dish._id)
        .populate("category", "name slug")
        .session(session);
    });

    return res.status(201).json(populatedDish);
  } catch (error) {
    if (imagePublicId) {
      try {
        await deleteFromCloudinary(imagePublicId);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError);
      }
    }

    if (error.message === "RESTAURANT_NOT_FOUND") {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (error.message === "RESTAURANT_NOT_ACTIVE") {
      return res.status(403).json({
        message: "Your restaurant is not active",
      });
    }

    if (error.message === "INVALID_CATEGORY") {
      return res.status(404).json({ message: "Invalid category" });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Dish ID is required",
      });
    }

    // Parse all form data
    const dishData = JSON.parse(req.body.data);

    // Upload new image only if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      dishData.image = result.secure_url;
      dishData.imagePublicId = result.public_id;
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { $set: dishData },
      { new: true, runValidators: true },
    );

    if (!updatedDish) {
      return res.status(404).json({
        message: "Dish not found",
      });
    }

    return res.status(200).json({
      message: "Dish updated successfully",
      dish: updatedDish,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDish = async (req, res) => {
  const { id } = req.params;
  const owner = req.userId;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const session = await mongoose.startSession();

  try {
    let deletedDish;

    await session.withTransaction(async () => {
      deletedDish = await Dish.findOneAndDelete({
        _id: id,
        restaurant: req.restaurantId,
      }).session(session);

      if (!deletedDish) {
        throw new Error("DISH_NOT_FOUND");
      }

      const restaurant = await Restaurant.findOneAndUpdate(
        { owner, _id: req.restaurantId },
        { $inc: { totalDishes: -1 } },
        { session, new: true },
      );

      if (!restaurant) {
        throw new Error("RESTAURANT_NOT_FOUND");
      }
    });

    if (deletedDish.imagePublicId) {
      try {
        await deleteFromCloudinary(deletedDish.imagePublicId);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError);
      }
    }

    return res.status(200).json({
      message: "Dish deleted successfully",
      dish: deletedDish,
    });
  } catch (error) {
    if (error.message === "DISH_NOT_FOUND") {
      return res.status(404).json({
        message: "Dish not found. Nothing deleted",
      });
    }

    if (error.message === "RESTAURANT_NOT_FOUND") {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};
