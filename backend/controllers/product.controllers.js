import Product from "../models/product.modal.js";
import slugGenerator from "../utils/slugGenerator.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

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

  const slug = slugGenerator(name);

  try {
    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res.status(400).json({ message: "product name already exists" });
    }
    const product = await Product.create({
      ...req.body,
      slug,
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
  const { name, price, description, images, category, variants, ingredients } =
    req.body;
  const { id } = req.params;

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

  const slug = slugGenerator(name);

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body, slug },
      { new: true }
    );
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "product not found." });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
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
