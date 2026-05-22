import Order from "../models/order.modal.js";

export const getPaginatedOrders = async ({
  filter = {},
  search,
  sort,
  orderStatus = "",
  page = 1,
  limit = 10,
  populate = "",
}) => {
  try {
    if (orderStatus !== "all" && orderStatus) {
      filter.orderStatus = orderStatus;
    }

    if (search) {
      const regex = new RegExp(search.trim(), "i");

      filter.$or = [
        { "deliveryAddress.fullName": regex },
        { "deliveryAddress.phoneNumber": regex },
        { "items.name": regex },
        { "restaurantSnapshot.name": regex },
        { "items.dish._id": regex },
      ];
    }

    // ↕ Sorting
    const sortMap = {
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      highest: { totalAmount: -1 },
      lowest: { totalAmount: 1 },
    };

    const sortOption = sortMap[sort] || { createdAt: -1 };

    // 📄 Pagination
    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.min(Number(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    // ⚡ Query
    const [
      orders,
      total,

      placed,
      confirmed,
      preparing,
      outForDelivery,
      delivered,
      cancelled,
    ] = await Promise.all([
      Order.find(filter)
        .select(
          "user items totalAmount orderStatus createdAt deliveryAddress restaurantSnapshot paymentStatus paymentMethod",
        )
        .populate("user")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .populate(populate)
        .lean(),

      Order.countDocuments(filter),

      Order.countDocuments({ orderStatus: "placed" }),
      Order.countDocuments({ orderStatus: "confirmed" }),
      Order.countDocuments({ orderStatus: "preparing" }),
      Order.countDocuments({ orderStatus: "out for delivery" }),
      Order.countDocuments({ orderStatus: "delivered" }),
      Order.countDocuments({ orderStatus: "cancelled" }),
    ]);

    return {
      items: orders,
      statusCount: {
        placed,
        confirmed,
        preparing,
        "out for delivery": outForDelivery,
        delivered,
        cancelled,
      },
      pagination: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
  }
};
