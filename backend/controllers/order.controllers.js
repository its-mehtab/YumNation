import Order from "../models/order.modal.js";
import { validateCoupon } from "../services/coupon.service.js";

export const getUserOrders = async (req, res) => {
  const { userId } = req.userId;

  try {
    const order = await Order.find({ userId });

    if (order.length === 0) {
      return res.status(400).json({ message: "Order is empty" });
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

    return res.status(201).json({ order });
  } catch (error) {
    console.error("createOrder error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error:", error: error.message });
  }
};
