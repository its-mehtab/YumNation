import Cart from "../models/cart.modal.js";
import Coupon from "../models/coupon.modal.js";
import Order from "../models/order.modal.js";
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
    // console.log(result.orders);

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
  try {
    const result = await getPaginatedOrders({
      filter: {},
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

export const createOrder = async (req, res) => {
  const userId = req.userId;
  const { deliveryAddress, couponCode, paymentMethod, paymentStatus } =
    req.body;

  try {
    const { coupon, cart, cartTotal } = await validateCoupon(
      userId,
      couponCode,
    );

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
    const tax = (subtotal * 5) / 100;
    const total = subtotal + deliveryFee + tax - discount;

    const order = await Order.create({
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
      paymentStatus,
      couponCode: coupon?.code || null,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { totalOrders: 1, totalSpent: total },
      $set: { lastOrderAt: new Date() },
    });

    if (coupon) {
      await Coupon.findOneAndUpdate(
        {
          _id: coupon._id,
          usedCount: { $lt: coupon.maxUses },
        },
        {
          $inc: { usedCount: 1 },
        },
      );
    }

    await Cart.findOneAndDelete({ user: userId });

    return res.status(201).json(order);
  } catch (error) {
    console.error("createOrder error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};
