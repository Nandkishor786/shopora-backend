import express from "express";
import {
  signup,
  login,
  refreshAccessToken,
  logoutUser,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout",protect, logoutUser);

export default router;
