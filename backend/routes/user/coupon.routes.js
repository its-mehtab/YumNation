import { Router } from "express";
import { verifyCoupon } from "../../controllers/coupon.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const couponRouter = Router();

couponRouter.get("/:code", checkAuth, verifyCoupon);

export default couponRouter;
