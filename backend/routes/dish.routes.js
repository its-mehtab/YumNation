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
dishRouter.get("/restaurants/:slug/dishes", setRestaurantFromParam, getDishes);
dishRouter.get(
  "/restaurant/:restaurantId",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getDishById,
);
dishRouter.get(
  "/admin/:restaurantId",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getDishById,
);
dishRouter.get("/:slug", getDishBySlug);

dishRouter.post("/", checkAuth, restaurantOnly, createDish);
dishRouter.patch(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  updateDish,
);
dishRouter.delete(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  deleteDish,
);

export default dishRouter;
