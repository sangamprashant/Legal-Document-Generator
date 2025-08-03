import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controllers/admin.controller";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
