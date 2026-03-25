import { Router } from "express";
import {
  createDish,
  getDishes,
  updateDish,
  deleteDish,
  getDishById,
} from "../../controllers/dish.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";

const dishOwnerRouter = Router();

dishOwnerRouter.get(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getDishes,
);
dishOwnerRouter.get(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getDishById,
);

dishOwnerRouter.post(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  createDish,
);
dishOwnerRouter.patch(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  updateDish,
);
dishOwnerRouter.delete(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  deleteDish,
);

export default dishOwnerRouter;
