import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import { getRestaurantOrders } from "../../controllers/order.controllers.js";
import { setRestaurantFromOwner } from "../../middleware/restaurant.middleware.js";
import { restaurantOnly } from "../../middleware/restaurantOnly.js";

const orderOwnerRouter = Router();

orderOwnerRouter.get(
  "/",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getRestaurantOrders,
);

export default orderOwnerRouter;
