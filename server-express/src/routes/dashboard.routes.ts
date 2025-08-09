import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, DashboardController.getDashboard);

export default router;
