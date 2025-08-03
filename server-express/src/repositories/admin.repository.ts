import { db } from "../config/db";
import { CaseDetail } from "../types/admin";

export const AdminRepository = {
  async getAllCaseDetailsForAdmin() {
    const sql = `
      SELECT
        c.case_id,
        c.status AS case_status,
        c.case_from,
        c.case_to,
        c.description,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        d.doc_id,
        d.type AS doc_type,
        d.status AS doc_status,
        d.file_path
      FROM cases c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN documents d ON c.case_id = d.case_id
      ORDER BY c.case_id DESC
    `;

    const [rows] = await db.promise().query(sql);
    return groupCases(rows as any[]);
  },

  async getCaseDetailsByUserId(userId: number) {
    const sql = `
      SELECT
        c.case_id,
        c.status AS case_status,
        c.case_from,
        c.case_to,
        c.description,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        d.doc_id,
        d.type AS doc_type,
        d.status AS doc_status,
        d.file_path
      FROM cases c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN documents d ON c.case_id = d.case_id
      WHERE u.id = ?
      ORDER BY c.case_id DESC
    `;

    const [rows] = await db.promise().query(sql, [userId]);
    return groupCases(rows as any[]);
  },
  
  async getCaseDetailsById(caseId: number) {
    const sql = `
    SELECT
      c.case_id,
      c.status AS case_status,
      c.case_from,
      c.case_to,
      c.description,
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      d.doc_id,
      d.type AS doc_type,
      d.status AS doc_status,
      d.file_path
    FROM cases c
    LEFT JOIN users u ON c.user_id = u.id
    LEFT JOIN documents d ON c.case_id = d.case_id
    WHERE c.case_id = ?
  `;
    const [rows] = await db.promise().query(sql, [caseId]);
    return groupCases(rows as any[]);
  },

  async getCaseByUserIdAndCaseId(userId: number, caseId: number) {
    const sql = `
      SELECT
        c.case_id,
        c.status AS case_status,
        c.case_from,
        c.case_to,
        c.description,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        d.doc_id,
        d.type AS doc_type,
        d.status AS doc_status,
        d.file_path
      FROM cases c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN documents d ON c.case_id = d.case_id
      WHERE u.id = ? AND c.case_id = ?
    `;

    const [rows] = await db.promise().query(sql, [userId, caseId]);
    return groupCases(rows as any[]);
  }

};


function groupCases(rows: any[]): CaseDetail[] {
  const caseMap = new Map<number, CaseDetail>();
  const groupedCases: CaseDetail[] = [];

  for (const row of rows) {
    if (!caseMap.has(row.case_id)) {
      const newCase: CaseDetail = {
        case_id: row.case_id,
        case_status: row.case_status,
        case_from: row.case_from,
        case_to: row.case_to,
        description: row.description,
        user: {
          user_id: row.user_id,
          name: row.user_name,
          email: row.user_email,
        },
        documents: [],
      };
      caseMap.set(row.case_id, newCase);
      groupedCases.push(newCase);
    }

    if (row.doc_id) {
      caseMap.get(row.case_id)!.documents.push({
        doc_id: row.doc_id,
        doc_type: row.doc_type,
        doc_status: row.doc_status,
        file_path: row.file_path,
      });
    }
  }

  return groupedCases;
}
