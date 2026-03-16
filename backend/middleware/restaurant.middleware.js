import Restaurant from "../models/restaurant.modal.js";

export const setRestaurantFromParam = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const restaurant = await Restaurant.findOne({ slug });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    req.restaurantId = restaurant._id;
    req.hideFields = "-cost";
    next();
  } catch (error) {
    res.status(500).json({ message: "Inernal server problem" });
  }
};

export const setRestaurantFromOwner = async (req, res, next) => {
  const owner = req.userId;

  try {
    const restaurant = await Restaurant.findOne({ owner });

    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }

    req.restaurantId = restaurant._id;
    req.hideFields = "";
    next();
  } catch (error) {
    res.status(500).json({ message: "Inernal server problem" });
  }
};

export const setRestaurantFromQuery = async (req, res, next) => {
  const restaurantId = req.query.restaurantId;

  try {
    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID required" });
    }

    req.restaurantId = restaurantId;
    req.hideFields = "";
    next();
  } catch (error) {
    res.status(500).json({ message: "Inernal server problem" });
  }
};
