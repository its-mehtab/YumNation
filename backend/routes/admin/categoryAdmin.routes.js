import { Router } from "express";
import {
  createCategory,
  getCategoriesForAdmin,
  hardDeleteCategory,
  updateCategory,
} from "../../controllers/category.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";
import { upload } from "../../middleware/upload.js";

const categoryAdminRouter = Router();

categoryAdminRouter.get("/", checkAuth, adminOnly, getCategoriesForAdmin);
categoryAdminRouter.post(
  "/",
  checkAuth,
  adminOnly,
  upload.single("image"),
  createCategory,
);
categoryAdminRouter.put("/:id", checkAuth, adminOnly, updateCategory);
categoryAdminRouter.delete("/:id", checkAuth, adminOnly, hardDeleteCategory);

export default categoryAdminRouter;
