import Product from "../models/product.modal.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to find products", error: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "unable to find product by slug",
      error: error.message,
    });
  }
};

export const getFilteredProducts = async (req, res) => {
  const query = res.query;
  console.log(query);
};

export const createProduct = async (req, res) => {
  const { name, price, description, images, category, variants, ingredients } =
    req.body;

  if (
    !name ||
    !price ||
    !description ||
    !images ||
    !category ||
    !variants ||
    !ingredients
  ) {
    return res.status(400).json({
      message:
        "name, price, description, images, category, variants and ingredients is required",
    });
  }

  try {
    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res.status(400).json({ message: "product already exists" });
    }
    const product = await Product.create({
      ...req.body,
      createdBy: req.userId,
    });

    return res.status(201).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.body.name && req.body.name !== product.name) {
      product.name = req.body.name;
    }

    if (req.body.price !== undefined) product.price = req.body.price;
    if (req.body.description !== undefined)
      product.description = req.body.description;
    if (req.body.stock !== undefined) product.stock = req.body.stock;
    if (req.body.images !== undefined) product.images = req.body.images;
    if (req.body.category !== undefined) product.category = req.body.category;
    if (req.body.variants !== undefined) product.variants = req.body.variants;
    if (req.body.ingredients !== undefined)
      product.ingredients = req.body.ingredients;

    if (req.body.isAvailable !== undefined)
      product.isAvailable = req.body.isAvailable;

    if (req.body.isFeatured !== undefined)
      product.isFeatured = req.body.isFeatured;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Product with this name already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "product not found. Nothing deleted" });
    }

    return res
      .status(200)
      .json({ message: "product deleted successfully", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
