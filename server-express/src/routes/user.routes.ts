import express from "express";
import { UserController } from "../controllers/user.controller";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.post("/", validateUser, UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:role", UserController.getUsersByRole);

export default router;
