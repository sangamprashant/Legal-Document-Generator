import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Role } from '../types/role';

export const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const result = await UserService.registerUser(name, email, password, Role.USER);
      res.status(201).json({ message: 'User created', userId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await UserService.fetchAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  getUsersByRole: async (req: Request, res: Response) => {
    const { role } = req.params;
    try {
      const users = await UserService.getUsersByRole(role);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};
