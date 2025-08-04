import { Request, Response } from "express";
import { CaseService } from "../services/case.service";
import { get } from "http";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { Role } from "../types/role";

export const CaseController = {
  createCase: async (req: Request, res: Response) => {
    const { user_id, case_from, case_to, description, status } = req.body;
    try {
      const result = await CaseService.createCase(
        user_id,
        case_from,
        case_to,
        description,
        status
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to create case", details: err });
    }
  },

  getAllCases: async (req: AuthenticatedRequest, res: Response) => {
    try {
      let result = [];

      if (req.user && req.user.role == Role.ADVOCATE) {
        result = await CaseService.advocateGetsAllCases();
      }

      if (req.user && req.user.role == Role.USER) {
        result = await CaseService.getUserCases(req.user.id);
      }

      return res
        .status(200)
        .json({ message: "All cases fetched successfully", cases: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch cases", details: err });
    }
  },

  getCasesByUser: async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
      const result = await CaseService.getUserCases(userId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch cases", details: err });
    }
  },

  getCaseById: async (req: Request, res: Response) => {
    const caseId = Number(req.params.caseId);
    try {
      const result = await CaseService.getCaseDetails(caseId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch case", details: err });
    }
  },

  getCaseData: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user || !req.params.caseId) {
        throw new Error("User or caseId not provided");
      }
      const result = await CaseService.getCaseData(
        req.user?.role as "advocate" | "user",
        req.user?.id,
        Number(req.params.caseId)
      );
      res.status(200).json(result[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch case data", details: error });
    }
  },

  updateCaseStatus: async (req: AuthenticatedRequest, res: Response) => {
    const caseId = Number(req.params.caseId);
    const { status } = req.body;

    try {
      if (!req.user || req.user.role !== Role.ADVOCATE) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const result = await CaseService.updateCaseStatus(caseId, status);
      res.status(200).json({ message: "Case status updated successfully", result });
    } catch (err) {
      res.status(500).json({ message: "Failed to update case status", details: err });
    }
  },
};
