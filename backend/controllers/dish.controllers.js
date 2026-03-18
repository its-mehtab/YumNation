import Dish from "../models/dish.modal.js";
import Restaurant from "../models/restaurant.modal.js";
import Category from "../models/category.modal.js";

// export const getDishes = async (req, res) => {
//   try {
//     const {
//       search,
//       category,
//       minPrice,
//       maxPrice,
//       availability,
//       sort,
//       page = 1,
//       limit = 6,
//     } = req.query;

//     const query = {};

//     // 🔍 Search
//     if (search) {
//       query.$text = { $search: search };
//     }

//     // 🏷 Category
//     if (category) {
//       const categoriesArray = category.split(",");
//       query.category = { $in: categoriesArray };
//     }

//     // 💰 Price
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     // 📦 Availability
//     if (availability) {
//       const values = availability.split(",");
//       const conditions = [];

//       if (values.includes("availableNow")) {
//         conditions.push({
//           isAvailable: true,
//         });
//       }

//       if (values.includes("recommended")) {
//         conditions.push({
//           isFeatured: true,
//         });
//       }

//       if (conditions.length) {
//         query.$or = conditions;
//       }
//     }

//     // ↕ Sorting
//     let sortOption = {};
//     if (sort === "price_asc") sortOption.price = 1;
//     if (sort === "price_desc") sortOption.price = -1;
//     if (sort === "rating") sortOption.rating = -1;
//     if (sort === "latest") sortOption.createdAt = -1;

//     const pageNum = Math.max(Number(page), 1);
//     const limitNum = Math.min(Number(limit), 50);

//     const [dishs, total] = await Promise.all([
//       Dish.find(query)
//         .populate("category", "name slug")
//         .sort(sortOption)
//         .skip((pageNum - 1) * limitNum)
//         .limit(limitNum)
//         .select(
//           "name price images slug description rating isAvailable isFeatured variants",
//         ),

//       Dish.countDocuments(query),
//     ]);

//     res.status(200).json({
//       dishs,
//       total,
//       page: pageNum,
//       pages: Math.ceil(total / limitNum),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch dishes" });
//   }
// };

export const getDishes = async (req, res) => {
  console.log(req.restaurantId);

  try {
    const dishes = await Dish.find({ restaurant: req.restaurantId })
      .populate("category", "name slug")
      .select(req.hideFields || "");

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
};

export const getDishBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const dish = await Dish.findOne({ slug }).populate("category", "name");

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({
      message: "unable to find dish by slug",
      error: error.message,
    });
  }
};

export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.restaurantId).populate(
      "category",
      "name slug",
    );

    if (!dish) return res.status(404).json({ message: "Dish not found" });

    if (dish.restaurant._id.toString() !== req.restaurantId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({
      message: "unable to find dish by id",
      error: error.message,
    });
  }
};

export const createDish = async (req, res) => {
  const {
    name,
    price,
    cost,
    shortDescription,
    longDescription,
    image,
    category,
    variants,
    addOns,
    foodType,
  } = req.body;

  const owner = req.userId;

  if (!name || !price || !shortDescription || !longDescription || !category) {
    return res.status(400).json({
      message: "name, price, description, category is required",
    });
  }

  try {
    const restaurant = await Restaurant.findOne({ owner });

    if (!restaurant) {
      return res.status(404).json("Restaurant not found");
    }

    if (restaurant.status !== "active") {
      return res.status(403).json({ message: "Your restaurant is not active" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Invalid category" });
    }

    const dish = await Dish.create({
      name,
      price,
      cost,
      shortDescription,
      longDescription,
      image,
      category,
      variants,
      addOns,
      foodType,
      restaurant: restaurant._id,
    });
    const populatedDish = await Dish.findById(dish._id).populate(
      "category",
      "name slug",
    );

    return res.status(201).json(populatedDish);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateDish = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const dish = await Dish.findOneAndUpdate(
      {
        _id: id,
        restaurant: req.restaurantId,
      },
      { $set: req.body },
      { new: true, runValidators: true },
    ).populate("category", "name slug");

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteDish = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const dish = await Dish.findOneAndDelete({
      _id: id,
      restaurant: req.restaurantId,
    });

    if (!dish) {
      return res
        .status(404)
        .json({ message: "Dish not found. Nothing deleted" });
    }

    return res.status(200).json({ message: "Dish deleted successfully", dish });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
