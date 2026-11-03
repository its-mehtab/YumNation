import { Router } from "express";
import { adminOnly } from "../../middleware/adminOnly.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { getDashboardStats } from "../../controllers/dashboard.controllers.js";

const dashboardAdminRouter = Router();

dashboardAdminRouter.get("/", checkAuth, adminOnly, getDashboardStats);

export default dashboardAdminRouter;
