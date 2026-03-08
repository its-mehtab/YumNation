import { Router } from "express";
import { validateCartBeforeCheckout } from "../controllers/checkout.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const checkoutRouter = Router();

checkoutRouter.get("/", checkAuth, validateCartBeforeCheckout);

export default checkoutRouter;
