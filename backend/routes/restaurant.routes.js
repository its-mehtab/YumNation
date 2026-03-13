import { Router } from "express";
import {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
} from "../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../middleware/restaurantOnly.js";
import { checkAuth } from "../middleware/checkAuth.js";

const restaurantRouter = Router();

restaurantRouter.get("/all", checkAuth, getAllRestaurant);
restaurantRouter.get("/", checkAuth, restaurantOnly, getRestaurant);
restaurantRouter.post("/apply", checkAuth, restaurantOnly, createRestaurant);
restaurantRouter.patch("/", checkAuth, restaurantOnly, updateRestaurant);

export default restaurantRouter;
