import { Router } from "express";
import {
  createCategory,
  getCategoriesForAdmin,
  hardDeleteCategory,
  updateCategory,
  updateCategoryStatus,
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
categoryAdminRouter.patch("/:id", checkAuth, adminOnly, updateCategoryStatus);
categoryAdminRouter.put("/:id", checkAuth, adminOnly, upload.single("image"), updateCategory);
categoryAdminRouter.delete("/:id", checkAuth, adminOnly, hardDeleteCategory);

export default categoryAdminRouter;
