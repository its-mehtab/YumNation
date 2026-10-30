import Order from "../models/order.modal.js";
import Restaurant from "../models/restaurant.modal.js";

export const getAllRestaurant = async (req, res) => {
  const { sort, page = 1, limit = 12 } = req.query;

  try {
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "rating") sortOption.rating = -1;
    if (sort === "delivery_time") sortOption.deliveryTime = 1;

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Number(limit), 40);

    const skip = (pageNum - 1) * limitNum;

    const restaurant = await Restaurant.find()
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  const { statusFilter, search, page = 1, limit = 12 } = req.query;

  const filter = {};
  if (statusFilter) filter.status = statusFilter;

  try {
    const restaurant = await Restaurant.find(filter).populate("owner");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const [totalRestaurants, pendingRestaurants, allRestaurantOrders] =
      await Promise.all([
        Restaurant.countDocuments(),
        Restaurant.countDocuments({ status: "pending" }),
        Order.aggregate([
          {
            $group: {
              _id: "$restaurant",
              totalAmount: { $sum: "$totalAmount" },
              totalOrders: { $sum: 1 },
            },
          },
        ]),
      ]);

    return res.status(200).json({
      items: restaurant,
      restaurantAnalatics: {
        totalRestaurants,
        pendingRestaurants,
        totalRevenue: allRestaurantOrders[0].totalAmount,
        allRestaurantOrders: allRestaurantOrders[0].totalOrders,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  let restaurantId = req.restaurantId;

  const isrestaurentSend = req.params.restaurantId;

  if (isrestaurentSend) {
    restaurantId = isrestaurentSend;
  }

  if (!restaurantId && !isrestaurentSend) {
    return res.status(400).json({ message: "Restaurant ID required" });
  }

  try {
    const restaurant =
      await Restaurant.findById(restaurantId).populate("owner");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  const owner = req.userId;
  const {
    name,
    description,
    email,
    phone,
    logo,
    costForTwo,
    coverImage,
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    openTime,
    closeTime,
    isPureVeg,
    deliveryTime,
    minOrderAmount,
    deliveryFee,
  } = req.body;

  if (
    !name ||
    !description ||
    !email ||
    !phone ||
    !addressLine1 ||
    !city ||
    !state ||
    !pinCode ||
    !openTime ||
    !closeTime ||
    !deliveryTime ||
    !minOrderAmount ||
    !deliveryFee
  ) {
    return res.status(400).json({ message: "Send all details" });
  }

  try {
    const restaurantExists = await Restaurant.findOne({ owner });

    if (restaurantExists) {
      return res
        .status(400)
        .json({ message: "Only one Restaurant is allowed for one user" });
    }

    const restaurant = await Restaurant.create({
      name,
      description,
      email,
      phone,
      costForTwo,
      logo,
      coverImage,
      address: { addressLine1, addressLine2, city, state, pinCode },
      openingHours: {
        open: openTime,
        close: closeTime,
      },
      isPureVeg,
      deliveryTime,
      minOrderAmount,
      deliveryFee,
      owner,
    });

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.restaurantId,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateRestaurantStatus = async (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;

  try {
    if (status === "rejected" && !rejectionReason) {
      return res.status(400).json({
        message: "Rejection reason is required",
      });
    }

    const updatedData = {
      status,
      rejectionReason: status !== "rejected" ? null : rejectionReason,
    };

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      { new: true },
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
