import { Router } from "express";
import { getDishes } from "../../controllers/dish.controllers.js";
import { setRestaurantFromParam } from "../../middleware/restaurant.middleware.js";

const dishRouter = Router();

dishRouter.get("/:slug", setRestaurantFromParam, getDishes);

export default dishRouter;
