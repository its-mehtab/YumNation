import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
} from "../controllers/category.controllers";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.get("/categories/:slug", getCategoryBySlug);

export default categoryRouter;
