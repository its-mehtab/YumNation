import { Router } from "express";
import {
  getAdminOrderById,
  getAllOrders,
  getRestaurantOrders,
  updateOrderStatus,
} from "../../controllers/order.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { setRestaurantFromQuery } from "../../middleware/restaurant.middleware.js";

const orderAdminRouter = Router();

orderAdminRouter.get("/", checkAuth, adminOnly, getAllOrders);
orderAdminRouter.get(
  "/restaurantorders",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getRestaurantOrders,
);
orderAdminRouter.get("/:id", checkAuth, adminOnly, getAdminOrderById);
orderAdminRouter.patch("/:id/status", checkAuth, adminOnly, updateOrderStatus);

export default orderAdminRouter;
