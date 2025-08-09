import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { Role } from "../types/role";

export const DashboardController = {
  async getDashboard(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const data = await DashboardService.getDashboardData(
        req.user?.id,
        req.user?.role as Role
      );
      res.json({ success: true, data });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
