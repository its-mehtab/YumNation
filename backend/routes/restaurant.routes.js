import { Router } from "express";
import {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
  updateRestaurantStatus,
  deleteRestaurant,
} from "../controllers/restaurant.controllers.js";
import { restaurantOnly } from "../middleware/restaurantOnly.js";
import { adminOnly } from "../middleware/adminOnly.js";
import { checkAuth } from "../middleware/checkAuth.js";

const restaurantRouter = Router();

restaurantRouter.get("/all", checkAuth, adminOnly, getAllRestaurant);
restaurantRouter.get("/", checkAuth, restaurantOnly, getRestaurant);
restaurantRouter.post("/apply", checkAuth, restaurantOnly, createRestaurant);
restaurantRouter.patch("/", checkAuth, restaurantOnly, updateRestaurant);
restaurantRouter.patch("/:id", checkAuth, adminOnly, updateRestaurantStatus);
restaurantRouter.delete("/:id", checkAuth, adminOnly, deleteRestaurant);

export default restaurantRouter;
