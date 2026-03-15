import { Router } from "express";
import {
  createDish,
  getDishes,
  getDishBySlug,
  updateDish,
  deleteDish,
  getDishById,
} from "../controllers/dish.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { restaurantOnly } from "../middleware/restaurantOnly.js";
import {
  setRestaurantFromOwner,
  setRestaurantFromParam,
  setRestaurantFromQuery,
} from "../middleware/restaurant.middleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const dishRouter = Router();

dishRouter.get("/restaurants/:slug/dishes", setRestaurantFromParam, getDishes);
dishRouter.get(
  "/restaurant/dishes",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getDishes,
);
dishRouter.get(
  "/admin/dishes",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getDishes,
);
dishRouter.get("/:slug", getDishBySlug);
dishRouter.get(
  "/restaurant/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getDishById,
);
dishRouter.get(
  "/admin/:id",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getDishById,
);

dishRouter.post("/", checkAuth, restaurantOnly, createDish);
dishRouter.patch("/:id", checkAuth, restaurantOnly, updateDish);
dishRouter.delete("/:id", checkAuth, restaurantOnly, deleteDish);

export default dishRouter;
