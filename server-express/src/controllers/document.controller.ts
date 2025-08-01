import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";

export const DocumentController = {
  async upload(req: Request, res: Response) {
    try {
      const { user_id, case_id } = req.body;
      const files = req.files as Express.Multer.File[];

      const saved = await DocumentService.uploadDocuments(files, +user_id, +case_id);
      res.status(200).json({ message: "Documents uploaded", saved });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { doc_id } = req.params;
      const { type, status, case_id } = req.body;
      const file = req.file;

      const result = await DocumentService.updateDocument(+doc_id, {
        type,
        status,
        case_id,
        file_path: file ? file.path : undefined
      });

      res.json({ message: "Document updated", result });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserDocs(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const documents = await DocumentService.getUserDocuments(+user_id);
      res.json(documents);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
};
