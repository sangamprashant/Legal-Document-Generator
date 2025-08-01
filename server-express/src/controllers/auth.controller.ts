import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

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
};
