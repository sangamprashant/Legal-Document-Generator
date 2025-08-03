import express from "express";
import { UserController } from "../controllers/user.controller";
import { validateUser } from "../middlewares/validateUser";
import { AdminController } from "../controllers/admin.controller";

const router = express.Router();


router.get("/case-data", AdminController.getAllCaseData);

export default router;
