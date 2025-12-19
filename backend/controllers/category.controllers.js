import Category from "../models/category.modal.js";

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "get data error" });
  }
};

export const getCategoryBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const data = await Category.findOne({ slug });
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to find slug:", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const data = await Category.create({ name, description });

    return res.status(201).json(data);
  } catch (error) {
    console.error("Create category error:", error); // see exact message

    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateCategory = async (req, res) => {};
export const updateCategoryStatus = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
