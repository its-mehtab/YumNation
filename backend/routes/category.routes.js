import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryBySlug,
  hardDeleteCategory,
  updateCategory,
} from "../controllers/category.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/", checkAuth, createCategory);
categoryRouter.put("/:id", checkAuth, updateCategory);
categoryRouter.delete("/:id", checkAuth, hardDeleteCategory);

export default categoryRouter;
