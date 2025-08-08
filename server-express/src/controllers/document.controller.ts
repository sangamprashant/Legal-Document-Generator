import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";

export const DocumentController = {
  async upload(req: Request, res: Response) {
    try {
      let { user_id, case_id, status, types } = req.body;
      const files = req.files as Express.Multer.File[];

      // Parse types if it's sent as JSON string or comma separated string
      if (typeof types === "string") {
        try {
          types = JSON.parse(types); // Expecting '["pdf","doc"]' style
        } catch {
          types = types.split(",").map((t: string) => t.trim()); // fallback
        }
      }

      if (!user_id || !case_id || !files?.length || !types?.length) {
        return res
          .status(400)
          .json({ message: "Missing or mismatched files/types." });
      }

      console.log({
        fileLength: files.length,
        typeLength: types.length,
      });

      const saved = await DocumentService.uploadDocuments(
        files,
        types,
        Number(user_id),
        Number(case_id),
        status
      );

      res
        .status(200)
        .json({ message: "Documents uploaded successfully.", saved });
    } catch (error:any) {
      console.error("Upload error:", error);
      res
        .status(500)
        .json({
          message: error.message || "Something went wrong during upload.",
        });
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
        file_path: file ? file.path : undefined,
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
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { doc_id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required." });
      }

      const result = await DocumentService.updateDocumentStatus(
        +doc_id,
        status
      );
      res.json({ message: "Document status updated", result });
     } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  },
};
