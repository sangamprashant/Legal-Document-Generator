import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
interface Case extends RowDataPacket {
  case_id: number;
  status: string;
  user_id: number;
}

export const CaseRepository = {
  createCase: (
    userId: number,
    caseFrom: string,
    caseTo: string,
    description: string,
    status: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cases (user_id, case_from, case_to, description,status) VALUES (?, ?, ?, ?, ?)",
        [userId, caseFrom, caseTo, description, status],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  getCaseById: async (caseId: number): Promise<Case | null> => {
    const [rows] = await db
      .promise()
      .query<Case[]>("SELECT * FROM cases WHERE case_id = ?", [caseId]);
    return rows.length ? rows[0] : null;
  },

  getCasesByUserId: (userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM cases WHERE user_id = ? ORDER BY case_id DESC",
        [userId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  advocateGetsAllCases: (): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM cases ORDER BY case_id DESC", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};
