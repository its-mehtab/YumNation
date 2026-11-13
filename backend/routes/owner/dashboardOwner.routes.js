import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import { getOwnerDashboardData } from "../../controllers/dashboard.controllers.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";

const dashboardOwnerRouter = Router();

dashboardOwnerRouter.get(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getOwnerDashboardData,
);

export default dashboardOwnerRouter;
