import { Router } from "express";
import {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
  updateRestaurantStatus,
  deleteRestaurant,
  getRestaurants,
} from "../../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";

const restaurantRouter = Router();

restaurantRouter.get("/", getAllRestaurant);

export default restaurantRouter;
