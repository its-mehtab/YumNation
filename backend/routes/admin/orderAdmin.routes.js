import { Router } from "express";
import { getAllOrders } from "../../controllers/order.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const orderAdminRouter = Router();

orderAdminRouter.get("/", checkAuth, adminOnly, getAllOrders);

export default orderAdminRouter;
