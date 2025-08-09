import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/update-email", authenticate, AuthController.updateEmail);
router.post("/update-password", authenticate, AuthController.updatePassword);

export default router;
