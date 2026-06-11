import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  productUpdatePatch,
  updateProductPut,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  protect,  
  adminOnly,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  addProduct,
);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.delete("/:id", protect, adminOnly, deleteProduct);

router.put("/:id", protect, adminOnly, updateProductPut);

router.patch("/:id", protect, adminOnly, productUpdatePatch);

export default router;
