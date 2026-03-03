import { Router } from "express";
import { validateCartBeforeCheckout } from "../controllers/checkout.controllers";
import { checkAuth } from "../middleware/checkAuth";

const checkoutRouter = Router();

checkoutRouter.get("/", checkAuth, validateCartBeforeCheckout);

export default checkoutRouter;
