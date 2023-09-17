import { Router } from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", authMiddleware, getUser);

export default router;
