import { Router } from "express";
import {
  updateRestaurantStatus,
  deleteRestaurant,
  getRestaurants,
} from "../../controllers/restaurant.controllers.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const restaurantAdminRouter = Router();

restaurantAdminRouter.get("/", checkAuth, adminOnly, getRestaurants);
restaurantAdminRouter.patch(
  "/:id",
  checkAuth,
  adminOnly,
  updateRestaurantStatus,
);
restaurantAdminRouter.delete("/:id", checkAuth, adminOnly, deleteRestaurant);

export default restaurantAdminRouter;
