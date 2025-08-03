import { AdminRepository } from "../repositories/admin.repository";
import { CaseRepository } from "../repositories/case.repository";

export const CaseService = {
  createCase: async (
    userId: number,
    caseFrom: string,
    caseTo: string,
    description: string,
    status: string
  ) => {
    const result = await CaseRepository.createCase(
      userId,
      caseFrom,
      caseTo,
      description,
      status
    );
    return { message: "Case created successfully", caseId: result.insertId };
  },

  getUserCases: async (userId: number) => {
    const cases = await CaseRepository.getCasesByUserId(userId);
    return cases;
  },

  getCaseDetails: async (caseId: number) => {
    const caseDetail = await CaseRepository.getCaseById(caseId);
    return caseDetail;
  },

  advocateGetsAllCases: async () => {
    const cases = await CaseRepository.advocateGetsAllCases();
    return cases;
  },

  getCaseData: async (
    role: "advocate" | "user",
    userId: number,
    caseId: number
  ) => {
    if (role === "advocate") {
      return await AdminRepository.getCaseDetailsById(caseId as number);
    } else if (role === "user") {
      return await AdminRepository.getCaseByUserIdAndCaseId(userId, caseId);
    } else {
      throw new Error("Invalid role");
    }
  },
};
