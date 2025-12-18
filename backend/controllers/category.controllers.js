import Category from "../models/category.modal";

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
  const slug = req.query.slug;
  console.log(slug);

  //   try {
  //     const data = await Category.findOne({ slug });
  //     console.log(data);
  //     return res.status(200).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "get data error" });
  //   }
};
