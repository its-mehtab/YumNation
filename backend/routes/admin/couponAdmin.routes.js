import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from "../../controllers/coupon.controllers.js";

const couponAdminRouter = Router();

couponAdminRouter.get("/", checkAuth, adminOnly, getCoupons);
couponAdminRouter.post("/", checkAuth, adminOnly, createCoupon);
couponAdminRouter.patch("/:id", checkAuth, adminOnly, updateCoupon);
couponAdminRouter.delete("/:id", checkAuth, adminOnly, deleteCoupon);

export default couponAdminRouter;
