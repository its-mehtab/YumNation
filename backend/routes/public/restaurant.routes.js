import { Router } from "express";
import {
  getRestaurant,
  getAllRestaurant,
} from "../../controllers/restaurant.controllers.js";
import { setRestaurantFromParam } from "../../middleware/restaurant.middleware.js";

const restaurantRouter = Router();

restaurantRouter.get("/", getAllRestaurant);
restaurantRouter.get("/:slug", setRestaurantFromParam, getRestaurant);

export default restaurantRouter;
