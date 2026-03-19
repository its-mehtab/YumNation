import { Router } from "express";
import {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
} from "../../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";

const restaurantOwnerRouter = Router();

restaurantOwnerRouter.get("/", checkAuth, restaurantOnly, getRestaurant);
restaurantOwnerRouter.post(
  "/apply",
  checkAuth,
  restaurantOnly,
  createRestaurant,
);
restaurantOwnerRouter.patch(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  updateRestaurant,
);

export default restaurantOwnerRouter;
