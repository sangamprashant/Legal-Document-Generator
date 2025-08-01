import { UserRepository } from "../repositories/user.repository";

export const UserService = {
  registerUser: async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    const user = await UserRepository.createUser(name, email, password, role);
    return user;
  },

  fetchAllUsers: async () => {
    return await UserRepository.getAllUsers();
  },

  getUsersByRole: async (role: string) => {
    return await UserRepository.getUsersByRole(role);
  },
};
