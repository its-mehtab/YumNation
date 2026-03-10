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
        .populate("items.product", "slug"),

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
            ? (cartTotal * coupon.value) / 100
            : 0;
    }

    const subtotal = cartTotal;
    const deliveryFee = 2.5;
    const tax = (subtotal * 5) / 100;
    const total = subtotal + deliveryFee + tax - discount;

    const order = await Order.create({
      user: userId,
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

    return res.status(201).json(order);
  } catch (error) {
    console.error("createOrder error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};
