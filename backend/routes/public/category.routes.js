import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
} from "../../controllers/category.controllers.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:slug", getCategoryBySlug);

export default categoryRouter;
