import { DashboardRepository } from "../repositories/dashboard.repository";
import { Role } from "../types/role";

export const DashboardService = {
  async getDashboardData(userId: number, role: Role) {
    if (role === Role.USER) {
      return await DashboardRepository.getUserDashboard(userId);
    } else if (role === Role.ADVOCATE) {
      return await DashboardRepository.getAdvocateDashboard(userId);
    }
    throw new Error("Invalid role");
  }
};
