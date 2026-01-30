import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { getUserWishlist } from "../controllers/wishlist.controllers.js";

const wishlistRouter = Router();

wishlistRouter.get("/", checkAuth, getUserWishlist);
// wishlistRouter.post("/", checkAuth, addWishlist);
// wishlistRouter.delete("/", checkAuth, removeFromWishlist);

export default wishlistRouter;
