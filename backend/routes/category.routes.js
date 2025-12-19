import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/category.controllers.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/", createCategory);
categoryRouter.post("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
