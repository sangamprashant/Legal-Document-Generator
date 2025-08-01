import { authenticate } from "./../middlewares/authMiddleware";
import express from "express";
import { CaseController } from "../controllers/case.controller";

const router = express.Router();

router.post("/", CaseController.createCase);
router.get("/", authenticate, CaseController.getAllCases);
router.get("/user/:userId", CaseController.getCasesByUser);
router.get("/:caseId", CaseController.getCaseById);

export default router;
