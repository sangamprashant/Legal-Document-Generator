import { db } from '../config/db';

export const DocumentRepository = {
  async create(document: any) {
    const sql = `INSERT INTO documents (type, template, status, user_id, case_id, file_path) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [document.type, document.template, document.status, document.user_id, document.case_id, document.file_path];
    const [result] = await db.promise().execute(sql, values);
    return result;
  },

  async getByUser(user_id: number) {
    const [rows] = await db.promise().query(`SELECT * FROM documents WHERE user_id = ?`, [user_id]);
    return rows;
  },

  async updateByDocId(doc_id: number, update: any) {
    const [result] = await db.promise().execute(
      `UPDATE documents SET type = ?, template = ?, status = ?, case_id = ?, file_path = ? WHERE doc_id = ?`,
      [update.type, update.template, update.status, update.case_id, update.file_path, doc_id]
    );
    return result;
  }
};
