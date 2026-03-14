import { Router } from "express";
import {
  createDish,
  getDishs,
  getDishBySlug,
  updateDish,
  deleteDish,
} from "../controllers/dish.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { restaurantOnly } from "../middleware/restaurantOnly.js";

const dishRouter = Router();

dishRouter.get("/", getDishs);
dishRouter.get("/:slug", getDishBySlug);

dishRouter.post("/", checkAuth, restaurantOnly, createDish);
dishRouter.patch("/:id", checkAuth, updateDish);
dishRouter.delete("/:id", checkAuth, deleteDish);

export default dishRouter;
