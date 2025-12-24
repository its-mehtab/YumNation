import Category from "../models/category.modal.js";
import product from "../models/product.modal.js";

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "unable to find categories", error: error.message });
  }
};

export const getCategoryBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const data = await Category.findOne({ slug });
    if (!data) {
      return res.status(404).json({ message: "category does not exists" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to find category:", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, description, image, parentCategory } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Name and description are required",
    });
  }

  try {
    const category = await Category.create({
      name,
      description,
      image,
      createdBy: req.userId,
    });

    return res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }

    return res.status(500).json({
      message: "Create category failed",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { name, description, image, isActive } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    if (name && category.name !== name) category.name = name;
    if (description && category.description !== description)
      category.description = description;
    if (image !== undefined) category.image = image;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Category with this name already exists",
      });
    }

    return res.status(500).json({
      message: "Unable to update category",
      error: error.message,
    });
  }
};

export const hardDeleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const productCount = await Product.countDocuments({ category: id });

    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. ${productCount} products still use it.`,
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category permanently deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hard delete failed",
      error: error.message,
    });
  }
};
