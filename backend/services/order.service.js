import Order from "../models/order.modal.js";

export const getPaginatedOrders = async ({
  filter = {},
  page = 1,
  limit = 5,
  populate = "",
}) => {
  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.min(Number(limit), 50);

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate(populate),

    Order.countDocuments(filter),
  ]);

  return {
    items: orders,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
  };
};
