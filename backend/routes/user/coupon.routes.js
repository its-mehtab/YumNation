import { Router } from "express";
import {
  createCoupon,
  getCoupons,
  verifyCoupon,
} from "../../controllers/coupon.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const couponRouter = Router();

couponRouter.get("/", checkAuth, adminOnly, getCoupons);
couponRouter.get("/:code", checkAuth, verifyCoupon);
couponRouter.post("/", createCoupon);

export default couponRouter;
