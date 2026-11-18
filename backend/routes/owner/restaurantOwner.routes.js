import { Router } from "express";
import {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
} from "../../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";
import { upload } from "../../middleware/upload.js";

const restaurantOwnerRouter = Router();

restaurantOwnerRouter.get(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getRestaurant,
);
restaurantOwnerRouter.post(
  "/apply",
  checkAuth,
  upload.single("image"),
  createRestaurant,
);
restaurantOwnerRouter.patch(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  upload.single("image"),
  updateRestaurant,
);

export default restaurantOwnerRouter;
