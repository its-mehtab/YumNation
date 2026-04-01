import Dish from "../models/dish.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import Wishlist from "../models/wishlist.modal.js";

export const getUserWishlist = async (req, res) => {
  const userId = req.userId;

  try {
    const wishlist = await Wishlist.findOne({ user: userId })
      .populate(
        "items.restaurant",
        "name slug rating deliveryTime deliveryFee isOpen address",
      )
      .populate("items.dishes.dish", "name slug variants isAvailable");

    if (!wishlist) {
      return res.status(200).json([]);
    }

    return res.status(200).json(wishlist.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  const { restaurantId, dishId } = req.body;
  const userId = req.userId;

  try {
    const [restaurantExist, dishExist] = await Promise.all([
      Restaurant.findById(restaurantId),
      Dish.findById(dishId),
    ]);

    if (!restaurantExist) {
      return res.status(404).json({ message: "Restaurant Not Found" });
    }
    if (!dishExist) {
      return res.status(404).json({ message: "Dish Not Found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      const restaurantIndex = wishlist.items.findIndex(
        (item) => item.restaurant.toString() === restaurantId,
      );

      if (restaurantIndex > -1) {
        const index = wishlist.items[restaurantIndex].dishes.findIndex(
          (item) => item.dish.toString() === dishId,
        );

        if (index > -1) {
          wishlist.items[restaurantIndex].dishes.splice(index, 1);
        } else {
          wishlist.items[restaurantIndex].dishes.push({
            dish: dishId,
            name: dishExist.name,
            image: dishExist.image,
            price: dishExist.price,
            foodType: dishExist.foodType,
          });
        }
      } else {
        wishlist.items.push({
          restaurant: restaurantId,
          name: restaurantExist.name,
          logo: restaurantExist.logo,
          dishes: {
            dish: dishId,
            name: dishExist.name,
            image: dishExist.image,
            price: dishExist.price,
            foodType: dishExist.foodType,
          },
        });
      }

      await wishlist.save();
    } else {
      wishlist = await Wishlist.create({
        user: userId,
        items: [
          {
            restaurant: restaurantId,
            name: restaurantExist.name,
            logo: restaurantExist.logo,
            dishes: {
              dish: dishId,
              name: dishExist.name,
              image: dishExist.image,
              price: dishExist.price,
              foodType: dishExist.foodType,
            },
          },
        ],
      });
    }

    const updatedWishlist = await Wishlist.findOne({ user: userId })
      .populate(
        "items.restaurant",
        "name slug rating deliveryTime deliveryFee isOpen address",
      )
      .populate("items.dishes.dish", "name slug variants isAvailable");

    return res.status(201).json(updatedWishlist.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { dishId, restaurantId } = req.params;

  try {

    let wishlist = await Wishlist.findOneAndUpdate(
      { user: userId, "items.restaurant": restaurantId },
      {
        $pull: {
          "items.$.dishes": { dish: dishId },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // console.log(wishlist.items[0].dishes);

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist or Restaurant not found" });
    }

    // const restaurantIndex = wishlist.items.findIndex(
    //   (r) => r.restaurant._id.toString() === restaurantId,
    // );

    // if (restaurantIndex === -1) {
    //   return res
    //     .status(404)
    //     .json({ message: "Restaurant not found in wishlist" });
    // }

    // const index = wishlist.items[restaurantIndex].dishes.findIndex(
    //   (item) => item.dish.toString() === dishId,
    // );

    // if (index === -1) {
    //   return res.status(404).json({ message: "Dish not found in wishlist" });
    // }

    // wishlist.items[restaurantIndex].dishes.splice(index, 1);

    // await wishlist.save();

    // const updatedWishlist = await wishlist
    //   .populate(
    //     "items.restaurant",
    //     "name slug rating deliveryTime deliveryFee isOpen address",
    //   )
    //   .populate("items.dishes.dish", "name slug variants isAvailable");

    return res.status(200).json(wishlist.items);
  } catch (error) {
    return res.status(500).json({
      message: "Remove from Wishlist error",
      error: error.message,
    });
  }
};

export const removeRestaurantFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { restaurantId } = req.params;

  try {
    let wishlist = await Wishlist.findOneAndUpdate(
      {
        user: userId,
        "items.restaurant": restaurantId,
      },
      {
        $pull: {
          items: { restaurant: restaurantId },
        },
      },
      {
        new: true,
      },
    )
      .populate(
        "items.restaurant",
        "name slug rating deliveryTime deliveryFee isOpen address",
      )
      .populate("items.dishes.dish", "name slug variants isAvailable");

    // if (!wishlist) {
    //   return res.status(404).json({ message: "Wishlist not found" });
    // }

    // const index = wishlist.items.findIndex(
    //   (item) => item.restaurant._id.toString() === restaurantId,
    // );

    // if (index === -1) {
    //   return res
    //     .status(404)
    //     .json({ message: "Restaurant not found in wishlist" });
    // }

    // wishlist.items[index].splice(index, 1);
    // await wishlist.save();

    // const updatedWishlist = await wishlist
    //   .populate(
    //     "items.restaurant",
    //     "name slug rating deliveryTime deliveryFee isOpen address",
    //   )
    //   .populate("items.dishes.dish", "name slug variants isAvailable");

    return res.status(200).json(wishlist.items);
  } catch (error) {
    return res.status(500).json({
      message: "Remove from Wishlist error",
      error: error.message,
    });
  }
};
