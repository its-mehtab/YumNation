import { Router } from "express";
import { getDishes, getDishById } from "../../controllers/dish.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { setRestaurantFromQuery } from "../../middleware/restaurant.middleware.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const dishAdminRouter = Router();

dishAdminRouter.get(
  "/",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getDishes,
);
dishAdminRouter.get(
  "/:restaurantId",
  checkAuth,
  adminOnly,
  setRestaurantFromQuery,
  getDishById,
);

export default dishAdminRouter;
