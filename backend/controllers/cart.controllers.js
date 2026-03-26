import Cart from "../models/cart.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import Dish from "../models/dish.modal.js";
import { generateCartKey } from "../utils/cartKey.js";

export const getUserCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items.dish", "name slug isAvailable variants")
      .lean();

    if (!cart) {
      return res.status(200).json([]);
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const addCart = async (req, res) => {
  const userId = req.userId;

  const { restaurant, dish, variant, addOns } = req.body;

  try {
    const dishDoc = await Dish.findById(dish);

    if (!dishDoc || !dishDoc.isAvailable) {
      return res.status(400).json({ message: "Dish unavailable" });
    }

    const restaurantDoc = await Restaurant.findById(restaurant);

    if (
      !restaurantDoc ||
      !restaurantDoc.isOpen ||
      !restaurantDoc.isActive ||
      !restaurantDoc.status !== "active"
    ) {
      return res.status(400).json({ message: "Restaurant unavailable" });
    }

    let price = dish.price;

    const variantExist = dish.variants.find((v) => v === variant);
    if (variantExist) {
      price = variantExist.price;
    }

    addOns.forEach((a) => {
      const addOnExist = dish.addOns.find((dishA) => dishA === a);

      if (addOnExist) {
        price += addOnExist.price;
      }
    });

    const basePrice = dishDoc.price;
    const name = dishDoc.name;
    const image = dishDoc.image;

    let cart = await Cart.findOne({ user: userId });

    const cartKey = generateCartKey(dish, variant, addOns);

    if (cart.restaurant !== restaurant) {
      cart.restaurant = restaurant;
      cart.items = [];
    }

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.cartKey === cartKey,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          dish,
          name,
          price,
          basePrice,
          cartKey,
          image,
          quantity: 1,
          variant,
          addOns,
        });
      }
      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        restaurant,
        items: [
          {
            dish,
            name,
            image,
            cartKey,
            price,
            basePrice,
            quantity,
            variant,
            addOns,
          },
        ],
      });
    }

    await cart.populate("items.dish", "name slug isAvailable variants");

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.dish",
      "name slug isAvailable variants",
    );

    return res.status(201).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { action, dishId, variant, addOns } = req.body;
  const userId = req.userId;

  if (!dishId || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const cartKey = generateCartKey(dishId, variant, addOns);

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.cartKey === cartKey);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "decrease") {
      if (item.quantity <= 1) {
        cart.items = cart.items.filter((i) => i.cartKey !== cartKey);
      } else {
        item.quantity -= 1;
      }
    }

    if (action === "increase") {
      if (item.quantity <= 10) {
        item.quantity += 1;
      }
    }

    await cart.save();

    const updatedCart = await cart.populate(
      "items.dish",
      "name slug isAvailable variants",
    );

    return res.status(200).json(updatedCart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;

  const { dishId, variant, addOns } = req.body;
  console.log(dishId);

  const cartKey = generateCartKey(dishId, variant, addOns);

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            dish: dishId,
            cartKey,
          },
        },
      },
      { new: true },
    ).populate("items.dish", "name slug isAvailable variants");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({
      message: "Remove from cart error",
      error: error.message,
    });
  }
};
