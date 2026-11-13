import Order from "../models/order.modal.js";
import Dish from "../models/dish.modal.js";
import User from "../models/user.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import mongoose from "mongoose";

export const getDashboardStats = async (req, res) => {
  const { startDate, endDate } = req.query;

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

  const difference = end - start + 1;

  const hours = difference / (1000 * 60 * 60);
  const days = difference / (1000 * 60 * 60 * 24);

  let unit;

  if (hours <= 24) {
    unit = "hour";
  } else if (days <= 30) {
    unit = "day";
  } else if (days <= 365) {
    unit = "month";
  } else {
    unit = "year";
  }

  const match = {};
  match.createdAt = {
    $gte: start,
    $lte: end,
  };

  try {
    const [
      chartData,
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
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: {
              $dateTrunc: {
                date: "$createdAt",
                unit,
                timezone: "Asia/Kolkata",
              },
            },
            totalOrders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        {
          $densify: {
            field: "_id",
            range: {
              step: 1,
              unit,
              bounds: [start, end],
            },
          },
        },
        {
          $fill: {
            output: {
              totalOrders: { value: 0 },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),

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
      interval: unit,
      orderChartData: chartData,
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

export const getOwnerDashboardData = async (req, res) => {
  const restaurant = new mongoose.Types.ObjectId(req.restaurantId);
  const { startDate, endDate } = req.query;

  console.log(restaurant);

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

  const difference = end - start + 1;

  const hours = difference / (1000 * 60 * 60);
  const days = difference / (1000 * 60 * 60 * 24);

  let unit;

  if (hours <= 24) {
    unit = "hour";
  } else if (days <= 30) {
    unit = "day";
  } else if (days <= 365) {
    unit = "month";
  } else {
    unit = "year";
  }

  const match = { restaurant };
  match.createdAt = {
    $gte: start,
    $lte: end,
  };

  console.log(match);

  try {
    const [
      chartData,
      totalDishes,
      totalOrders,
      totalRevenue,
      pending,
      confirmed,
      preparing,
      outForDelivery,
      delivered,
      cancelled,
    ] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            restaurant,
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: {
              $dateTrunc: {
                date: "$createdAt",
                unit,
                timezone: "Asia/Kolkata",
              },
            },
            totalOrders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        {
          $densify: {
            field: "_id",
            range: {
              step: 1,
              unit,
              bounds: [start, end],
            },
          },
        },
        {
          $fill: {
            output: {
              totalOrders: { value: 0 },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      Dish.countDocuments({ restaurant }),
      Order.countDocuments(match),
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
      interval: unit,
      orderChartData: chartData,
      totalDishes,
      totalOrders,
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
