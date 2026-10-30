import mongoose from "mongoose";
import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";
import Dish from "../models/dish.modal.js";
import Order from "../models/order.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import User from "../models/user.modal.js";
import { validateCoupon } from "../services/coupon.service.js";
import { getPaginatedOrders } from "../services/order.service.js";

export const getUserOrders = async (req, res) => {
  try {
    const result = await getPaginatedOrders({
      filter: { user: req.userId },
      page: req.query.page,
      limit: req.query.limit,
      populate: "items.dish",
    });

    if (result?.orders?.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  const { search, sort, orderStatus, page = 1, limit = 12 } = req.query;

  try {
    const result = await getPaginatedOrders({
      filter: {},
      search,
      sort,
      orderStatus,
      page: page,
      limit: limit,
      populate: "items.dish",
    });

    if (result?.orders?.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRestaurantOrders = async (req, res) => {
  const { search, sort, orderStatus, page = 1, limit = 12 } = req.query;

  try {
    const result = await getPaginatedOrders({
      filter: { restaurant: req.restaurantId },
      search,
      sort,
      orderStatus,
      page: page,
      limit: limit,
      populate: "items.dish",
    });

    if (result?.orders?.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const order = await Order.findOne({ user: userId, _id: id })
      .populate("items.dish", "slug")
      .populate(
        "restaurant",
        "name logo slug cuisine address isOpen rating deliveryFee deliveryTime status",
      );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};

export const getRestaurantOrderById = async (req, res) => {
  const { id } = req.params;
  const restaurantId = req.restaurantId;

  try {
    const order = await Order.findOne({
      restaurant: restaurantId,
      _id: id,
    })
      .populate("user", "firstName lastName email phone")
      .populate("items.dish");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};

export const getAdminOrderById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const order = await Order.findOne({ _id: id })
      .populate("items.dish")
      .populate("restaurant")
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};

const validStatuses = [
  "placed",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
  "cancelled",
];

export const updateOrderStatus = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById(userId);

  if (!status)
    return res.status(400).json({
      message: "Status is required",
    });

  if (!validStatuses.includes(status))
    return res.status(400).json({
      message: "Invalid status",
    });

  try {
    const order = await Order.findById(id);
    const restaurant = await Restaurant.findById(order.restaurant).select(
      "owner",
    );

    if (order.orderStatus === "delivered" && status !== "cancelled") {
      return res.status(400).json({
        message: "Cannot revert delivered order",
      });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled",
      });
    }

    if (status === "cancelled") {
      await Restaurant.findByIdAndUpdate(order.restaurant, {
        $inc: {
          revenue: -order.totalAmount,
        },
      });

      await User.findByIdAndUpdate(order.user, {
        $inc: {
          totalSpent: -order.totalAmount,
        },
      });

      if (order.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: order.couponCode,
          },
          {
            $inc: { usedCount: -1 },
          },
        );
      }
    }

    if (user.role !== "admin" && restaurant.owner.toString() !== userId)
      return res.status(403).json({
        message: "No Permission",
      });

    if (!order)
      return res.status(404).json({
        message: "Order not found",
      });

    if (order.paymentMethod === "cod") {
      if (status === "delivered") {
        order.paymentStatus = "paid";
      } else {
        order.paymentStatus = "pending";
      }
    }

    order.orderStatus = status;

    if (order.paymentMethod === "cod" && status === "delivered") {
      order.paymentStatus = "paid";
    }

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  const userId = req.userId;
  const { deliveryAddress, couponCode, paymentMethod, paymentStatus } =
    req.body;

  if (!deliveryAddress) {
    return res.status(400).json({ message: "Delivery address is required" });
  }
  if (!paymentMethod) {
    return res.status(400).json({ message: "Payment method is required" });
  }

  const session = await mongoose.startSession();
  let createdOrder = null;

  try {
    await session.withTransaction(async () => {
      const { coupon, cart, cartTotal } = await validateCoupon(
        userId,
        couponCode,
      );

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      let discount = 0;

      if (coupon) {
        discount =
          coupon.discountType === "flat"
            ? coupon.value
            : coupon.discountType === "percentage"
              ? Math.min((cartTotal * coupon.value) / 100, coupon.maxDiscount)
              : 0;
      }

      const subtotal = cartTotal;
      const deliveryFee = 2.5;
      const tax = Math.round(subtotal * 5) / 100;
      const total = subtotal + deliveryFee + tax - discount;

      const order = await Order.create(
        [
          {
            user: userId,
            restaurant: cart.restaurant._id,
            restaurantSnapshot: {
              name: cart.restaurant.name,
              logo: cart.restaurant.logo,
            },
            items: cart.items,
            deliveryAddress,
            subtotal,
            deliveryFee,
            tax,
            discount,
            totalAmount: total,
            paymentMethod,
            paymentStatus:
              paymentStatus || (paymentMethod === "cod" ? "pending" : "paid"),
            couponCode: coupon?.code || null,
          },
        ],
        { session },
      );

      await Restaurant.findByIdAndUpdate(
        cart.restaurant._id,
        {
          $inc: { totalOrders: 1, revenue: total },
        },
        { session },
      );

      await User.findByIdAndUpdate(
        userId,
        {
          $inc: { totalOrders: 1, totalSpent: total },
          $set: { lastOrderAt: new Date() },
        },
        { session },
      );

      await Dish.updateMany(
        {
          _id: {
            $in: order.items.map((item) => item.dish),
          },
        },
        {
          $inc: { totalOrders: 1 },
        },
        { session },
      );

      if (coupon) {
        await Coupon.findOneAndUpdate(
          {
            _id: coupon._id,
            usedCount: { $lt: coupon.maxUses },
          },
          {
            $inc: { usedCount: 1 },
          },
          { session },
        );
      }

      await Cart.findOneAndDelete({ user: userId }, { session });
      createdOrder = order;
    });
    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error("createOrder error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  } finally {
    await session.endSession();
  }
};
