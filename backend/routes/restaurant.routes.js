import { Router } from "express";
import {
  createRestaurant,
  editRestaurant,
  getRestaurant,
} from "../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../middleware/restaurantOnly.js";
import { checkAuth } from "../middleware/checkAuth.js";

const restaurantRouter = Router();

restaurantRouter.get("/:id", checkAuth, restaurantOnly, getRestaurant);
restaurantRouter.post("/apply", checkAuth, restaurantOnly, createRestaurant);
restaurantRouter.patch("/", checkAuth, restaurantOnly, editRestaurant);

export default restaurantRouter;
