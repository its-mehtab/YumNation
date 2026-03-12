import Restaurant from "../models/restaurant.modal.js";

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
    openingHours,
    isPureVeg,
    deliveryTime,
    minOrderAmount,
    deliveryFee,
  } = req.body;

  console.log(
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
    openingHours,
    isPureVeg,
    deliveryTime,
    minOrderAmount,
    deliveryFee,
  );

  try {
    const restaurant = await Restaurant.create({
      name,
      description,
      email,
      phone,
      logo,
      coverImage,
      address: { addressLine1, addressLine2, city, state, pinCode },
      openingHours,
      isPureVeg,
      deliveryTime,
      minOrderAmount,
      deliveryFee,
      owner,
    });

    if (
      !name ||
      !description ||
      !email ||
      !phone ||
      !logo ||
      !coverImage ||
      !address ||
      !openingHours ||
      !isPureVeg ||
      !deliveryTime ||
      !minOrderAmount ||
      !deliveryFee ||
      !owner
    ) {
      return res.status(400).json({ message: "Send all details" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const editRestaurant = async (rq, res) => {
  console.log(",jdb");
};
