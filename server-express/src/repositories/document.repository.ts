import { db } from '../config/db';

export const DocumentRepository = {
  async create(document: any) {    
    // Replace undefined with null for optional fields
    const type = document.type ?? null;
    const status = document.status ?? null;
    const user_id = document.user_id;
    const case_id = document.case_id;
    const file_path = document.file_path;

    // Basic validation for required fields
    if (!user_id || !case_id || !file_path) {
      throw new Error("Missing required fields: user_id, case_id, or file_path.");
    }

    const sql = `
      INSERT INTO documents (type,  status, user_id, case_id, file_path) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [type,  status, user_id, case_id, file_path];
    
    const [result] = await db.promise().execute(sql, values);
    return result;
  },

  async getByUser(user_id: number) {
    const [rows] = await db.promise().query(
      `SELECT * FROM documents WHERE user_id = ?`, 
      [user_id]
    );
    return rows;
  },

  async updateByDocId(doc_id: number, update: any) {
    const [result] = await db.promise().execute(
      `UPDATE documents SET type = ?, status = ?, case_id = ?, file_path = ? WHERE doc_id = ?`,
      [
        update.type ?? null,
        update.status ?? null,
        update.case_id ?? null,
        update.file_path ?? null,
        doc_id
      ]
    );
    return result;
  },

  async updtateStatusByDocId(doc_id: number, status: string) {
    const [result] = await db.promise().execute(
      `UPDATE documents SET status = ? WHERE doc_id = ?`,
      [status, doc_id]
    );
    return result;
  }

};
