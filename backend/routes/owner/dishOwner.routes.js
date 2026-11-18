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
import { upload } from "../../middleware/upload.js";

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
  upload.single("image"),
  createDish,
);
dishOwnerRouter.patch(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  upload.single("image"),
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
