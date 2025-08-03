import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";

export const DocumentController = {
  async upload(req: Request, res: Response) {
    try {
      const { user_id, case_id } = req.body;
      const files = req.files as Express.Multer.File[];

      console.log(req.body, files);

      if (!user_id || !case_id || !files || files.length === 0) {
        return res.status(400).json({ message: "Missing required fields or files." });
      }

      const saved = await DocumentService.uploadDocuments(files, Number(user_id), Number(case_id));
      res.status(200).json({ message: "Documents uploaded successfully.", saved });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ message: error.message || 'Something went wrong during upload.' });
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
