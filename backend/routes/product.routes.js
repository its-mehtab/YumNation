import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
} from "../controllers/product.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:slug", getProductBySlug);
productRouter.get("/", getFilteredProducts);

productRouter.post("/", checkAuth, createProduct);
productRouter.put("/:id", checkAuth, updateProduct);
productRouter.delete("/:id", checkAuth, deleteProduct);

export default productRouter;
