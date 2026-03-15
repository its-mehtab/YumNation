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
//     res.status(500).json({ message: "Failed to fetch dishs" });
//   }
// };

export const getDishes = async (req, res) => {
  try {
    // const { category, minPrice, maxPrice, availability } =
    //   req.query;

    const dishes = await Dish.find({ restaurant: req.restaurantId })
      .populate("category", "name slug")
      .select(req.hideFields || "");

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dishs" });
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
    const dish = await Dish.findById(req.params.id)
      .populate("category", "name")
      .populate("restaurant", "name slug");

    if (!dish) return res.status(404).json({ message: "Dish not found" });

    if (dish.restaurant._id.toString() !== req.restaurantId.toString()) {
      return res.status(403).json({ message: "Not authorizeddsd" });
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
    categoryId,
    variants,
    addOns,
    foodType,
  } = req.body;

  const owner = req.userId;

  if (!name || !price || !shortDescription || !longDescription || !categoryId) {
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

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Invalid category" });
    }

    const dish = await Dish.create({
      name,
      price,
      cost,
      shortDescription,
      longDescription,
      image,
      category: categoryId,
      variants,
      addOns,
      foodType,
      restaurant: restaurant._id,
    });

    return res.status(201).json(dish);
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
    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    if (req.body.name && req.body.name !== dish.name) {
      dish.name = req.body.name;
    }

    if (req.body.price !== undefined) dish.price = req.body.price;
    if (req.body.description !== undefined)
      dish.description = req.body.description;
    if (req.body.images !== undefined) dish.images = req.body.images;
    if (req.body.category !== undefined) dish.category = req.body.category;
    if (req.body.variants !== undefined) dish.variants = req.body.variants;
    if (req.body.addOns !== undefined) dish.addOns = req.body.addOns;
    if (req.body.ingredients !== undefined)
      dish.ingredients = req.body.ingredients;

    if (req.body.isAvailable !== undefined)
      dish.isAvailable = req.body.isAvailable;

    if (req.body.isFeatured !== undefined)
      dish.isFeatured = req.body.isFeatured;

    await dish.save();

    return res.status(200).json(dish);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Dish with this name already exists",
      });
    }

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
    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      return res
        .status(404)
        .json({ message: "dish not found. Nothing deleted" });
    }

    return res.status(200).json({ message: "dish deleted successfully", dish });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
