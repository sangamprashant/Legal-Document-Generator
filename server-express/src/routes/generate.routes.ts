import fs from "fs";
// routes/documents.ts
import express, { Request, Response } from "express";
import { generateResult } from "../utils/pythonServerConnect";
import multer from "multer";
import PDFDocument from "pdfkit";
import { upload } from "../middlewares/upload";
import { DocumentRepository } from "../repositories/document.repository";

const router = express.Router();

router.post("/generate-doc", async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ message: "Prompt is required and must be a string" });
  }

  try {
    const result = await generateResult(prompt);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Python server error:", error);
    res.status(500).json({ message: "Failed to generate document" });
  }
});

router.post(
  "/upload",
  upload.single("documents"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      const { user_id, case_id } = req.body;

      if (!user_id || !case_id) {
        throw new Error("");
      }

      const pdfPath = `uploads/${Date.now()}-document.pdf`;
      fs.renameSync(req.file.path, pdfPath);

      await DocumentRepository.create({
        file_path: pdfPath,
        user_id,
        case_id,
        status: "Approved",
        type: "Affidavit",
      });

      res.json({ message: "PDF uploaded", path: pdfPath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload error" });
    }
  }
);

export default router;
