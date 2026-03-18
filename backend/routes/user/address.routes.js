import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js";
import {
  createAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from "../../controllers/address.controllers.js";

const addressRouter = Router();

addressRouter.get("/", checkAuth, getUserAddress);
addressRouter.post("/", checkAuth, createAddress);
addressRouter.patch("/:id", checkAuth, updateAddress);
addressRouter.delete("/:id", checkAuth, deleteAddress);

export default addressRouter;
