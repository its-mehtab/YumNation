import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import {
  getUserWishlist,
  removeFromWishlist,
  removeRestaurantFromWishlist,
  toggleWishlist,
} from "../../controllers/wishlist.controllers.js";

const wishlistRouter = Router();

wishlistRouter.get("/", checkAuth, getUserWishlist);
wishlistRouter.post("/", checkAuth, toggleWishlist);
wishlistRouter.delete(
  "/:restaurantId/dishes/:dishId",
  checkAuth,
  removeFromWishlist,
);
wishlistRouter.delete(
  "/:restaurantId",
  checkAuth,
  removeRestaurantFromWishlist,
);

export default wishlistRouter;
