import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import {
  getRestaurantOrderById,
  getRestaurantOrders,
  updateOrderStatus,
} from "../../controllers/order.controllers.js";
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
orderOwnerRouter.get(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  getRestaurantOrderById,
);
orderOwnerRouter.patch(
  "/:id",
  checkAuth,
  restaurantOnly,
  setRestaurantFromOwner,
  updateOrderStatus,
);

export default orderOwnerRouter;
