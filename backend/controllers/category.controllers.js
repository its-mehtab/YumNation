import Category from "../models/category.modal.js";
import slugGenerator from "../utils/slugGenerator.js";

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
      res.status(404).json({ message: "category does not exists" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to find category:", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "category name is required" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: "category description is required" });
  }

  const slug = slugGenerator(name);

  try {
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res
        .status(400)
        .json({ message: `category named ${name} already exists` });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      createdBy: req.userId,
    });

    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Create category failed", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { name, description, image, isActive } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  if (!name || !description || !image) {
    return res
      .status(400)
      .json({ message: "name, description and image is required" });
  }

  const slug = slugGenerator(name);

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { ...req.body, slug },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to update category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found. Nothing deleted." });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to delete category", error: error.message });
  }
};
