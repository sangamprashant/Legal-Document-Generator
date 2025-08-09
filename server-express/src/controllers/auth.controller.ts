import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await AuthService.register(name, email, password);
      res.status(201).json({ message: "Registered successfully", ...user });
    } catch (err:any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await AuthService.login(email, password);
      res.json({ message: "Login successful", ...user });
    } catch (err:any) {
      res.status(401).json({ message: err.message });
    }
  },

    updateEmail: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { newEmail } = req.body;
      const userId = req?.user?.id || 0; 
      await AuthService.changeEmail(userId , newEmail);
      res.json({ message: "Email updated successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id ||0;
      await AuthService.changePassword(userId, currentPassword, newPassword);
      res.json({ message: "Password updated successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
