import Restaurant from "../models/restaurant.modal.js";

export const getAllRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find()
      .populate("owner", "firstName")
      .select(
        "name owner email phone address totalOrders rating status joinedAt",
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

export const getRestaurant = async (req, res) => {
  const owner = req.userId;
  try {
    const restaurant = await Restaurant.findOne({ owner });

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
  console.log(",jdb");
};

export const updateRestaurantStatus = async (req, res) => {
  const owner = req.userId;
  try {
    const restaurant = await Restaurant.findOne({ owner });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
