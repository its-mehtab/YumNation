import { Router } from "express";
import {
  getAdminOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../../controllers/order.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const orderAdminRouter = Router();

orderAdminRouter.get("/", checkAuth, adminOnly, getAllOrders);
orderAdminRouter.get("/:id", checkAuth, adminOnly, getAdminOrderById);
orderAdminRouter.patch("/:id/status", checkAuth, adminOnly, updateOrderStatus);

export default orderAdminRouter;
