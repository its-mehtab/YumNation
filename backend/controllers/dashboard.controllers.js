import Order from "../models/order.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import User from "../models/user.modal.js";

export const getDashboardStats = async (req, res) => {
  const { startDate, endDate } = req.query;

  console.log(startDate, endDate);

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Starting and End date is required" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      message: "Invalid date range",
    });
  }

  if (start > end) {
    return res.status(400).json({
      message: "Start date cannot be greater than end date",
    });
  }

  const match = {};
  match.createdAt = {
    $gte: start,
    $lte: end,
  };

  try {
    const [
      totalRestaurants,
      totalOrders,
      totalCustomers,
      totalRevenue,
      pending,
      confirmed,
      preparing,
      outForDelivery,
      delivered,
      cancelled,
    ] = await Promise.all([
      Restaurant.countDocuments(match),
      Order.countDocuments(match),
      User.countDocuments({
        ...match,
        role: "user",
      }),
      Order.aggregate([
        { $match: match },
        {
          $match: {
            paymentStatus: "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" },
          },
        },
      ]),
      Order.countDocuments({ ...match, orderStatus: "placed" }),
      Order.countDocuments({ ...match, orderStatus: "confirmed" }),
      Order.countDocuments({ ...match, orderStatus: "preparing" }),
      Order.countDocuments({ ...match, orderStatus: "out for delivery" }),
      Order.countDocuments({ ...match, orderStatus: "delivered" }),
      Order.countDocuments({ ...match, orderStatus: "cancelled" }),
    ]);

    return res.status(200).json({
      totalRestaurants,
      totalOrders,
      totalCustomers,
      totalRevenue: totalRevenue[0]?.totalAmount || 0,
      orderStats: {
        pending,
        confirmed,
        preparing,
        outForDelivery,
        delivered,
        cancelled,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
