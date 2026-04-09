import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import {
  createCoupon,
  getCoupons,
} from "../../controllers/coupon.controllers.js";

const couponAdminRouter = Router();

couponAdminRouter.get("/", checkAuth, adminOnly, getCoupons);
couponAdminRouter.post("/", checkAuth, adminOnly, createCoupon);

export default couponAdminRouter;
