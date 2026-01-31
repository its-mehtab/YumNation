import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getUserWishlist,
  toggleWishlist,
} from "../controllers/wishlist.controllers.js";

const wishlistRouter = Router();

wishlistRouter.get("/", checkAuth, getUserWishlist);
wishlistRouter.post("/", checkAuth, toggleWishlist);
// wishlistRouter.delete("/", checkAuth, removeFromWishlist);

export default wishlistRouter;
