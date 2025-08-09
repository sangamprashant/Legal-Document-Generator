import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export const DashboardRepository = {
  async getUserDashboard(userId: number): Promise<any> {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM cases WHERE user_id = ? ) AS total_cases,
        (SELECT COUNT(*) FROM documents WHERE user_id = ? AND status != 'Approved') AS pending_docs,
        (SELECT COUNT(*) FROM cases WHERE user_id = ? AND status = 'Resolved') AS resolved_cases
    `;

    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(query, [userId, userId, userId]);

    return rows[0]; // now no TS error
  },

  async getAdvocateDashboard(advocateId: number): Promise<any> {
    const query = `
      SELECT 
        (SELECT COUNT(DISTINCT user_id) FROM cases) AS total_clients,
        (SELECT COUNT(*) FROM cases WHERE status = 'In Progress') AS cases_in_progress,
        (SELECT COUNT(*) FROM documents) AS docs_reviewed
    `;

    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(query, );

    return rows[0]; // now no TS error
  }
};
