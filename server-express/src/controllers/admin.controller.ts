import { Request, Response } from 'express';
import { AdminRepository } from '../repositories/admin.repository';

export const AdminController = {
  getAllCaseData: async (req: Request, res: Response) => {
    try {
      const data = await AdminRepository.getAllCaseDetailsForAdmin();
      res.status(200).json({ cases: data });
    } catch (error: any) {
      console.error("Error fetching case details for admin:", error);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  },
};
