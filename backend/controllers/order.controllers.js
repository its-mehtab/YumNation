import Cart from "../models/cart.modal.js";
import Order from "../models/order.modal.js";
import { validateCoupon } from "../services/coupon.service.js";

export const getUserOrders = async (req, res) => {
  const userId = req.userId;
  const { page = 1, limit = 5 } = req.query;

  try {
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Number(limit), 50);

    const [orders, total] = await Promise.all([
      Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("items.dish", "slug"),

      Order.countDocuments({ user: userId }),
    ]);

    if (orders.length === 0) {
      return res.status(400).json({ message: "Order is empty" });
    }

    res.status(200).json({
      orders,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
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
    });

    await Cart.findOneAndDelete({ user: userId });

    return res.status(201).json(order);
  } catch (error) {
    console.error("createOrder error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};
