import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { Role } from "../types/role";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const generateAuthResponse = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    await UserRepository.createUser(name, email, password, Role.USER);
    const user: any = await UserRepository.getUserByEmail(email);
    return generateAuthResponse(user);
  },

  login: async (email: string, password: string) => {
    const user: any = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = password === user.password;
    if (!isMatch) throw new Error("Invalid credentials");

    return generateAuthResponse(user);
  },
};
