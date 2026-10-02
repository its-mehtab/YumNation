import { Router } from "express";
import {
  updateRestaurantStatus,
  deleteRestaurant,
  getRestaurants,
  getRestaurant,
} from "../../controllers/restaurant.controllers.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { setRestaurantFromQuery } from "../../middleware/restaurant.middleware.js";

const restaurantAdminRouter = Router();

restaurantAdminRouter.get("/", checkAuth, adminOnly, getRestaurants);
restaurantAdminRouter.get(
  "/:restaurantId",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getRestaurant,
);
restaurantAdminRouter.patch(
  "/:id",
  checkAuth,
  adminOnly,
  updateRestaurantStatus,
);
restaurantAdminRouter.delete("/:id", checkAuth, adminOnly, deleteRestaurant);

export default restaurantAdminRouter;
